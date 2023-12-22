// 路由鉴权
import router from "@/router";
import setting from "./setting";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
// 获取用户的小仓库
import useUserStore from "./store/modules/user";
import pinia from "./store";

nprogress.configure({ showSpinner: false });

const userStore = useUserStore(pinia);

// 全局守卫: 项目中切换路由触发的钩子
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}`;
  // to:将要访问某一个路由
  // from:从哪个路由来
  // next: 路由放行
  nprogress.start();
  // 获取token,是否登录
  const token = userStore.token;
  // 获取用户的名字
  const username = userStore.username;
  if (token) {
    // 已登录
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      // 登录成功访问其余的六个路由
      if (username) {
        next();
      } else {
        // 发请求获取用户信息
        try {
          await userStore.userInfo();
          next({ ...to });
        } catch (error) {
          // token过期
          // 用户手动修改本地存储
          await userStore.userLogout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    // 未登录
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});
// 全局后置守卫
router.afterEach(() => {
  nprogress.done();
});

// 第一个问题:任意路由切换实现进度条业务 ---nprogress
// 第二个问题: 路由鉴权
