// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入接口
import { reqLogin, reqUserInfo } from "@/api/user";
import type { UserState } from "./types/type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
// 引入路由
import { constantRoute, asyncRoute, anyRoute } from "@/router/routes";
//引入深拷贝方法
import cloneDeep from "lodash/cloneDeep";
import router from "@/router";

//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}

function getPermissionCodes(roles) {
  const codeSet = new Set();
  for (const role of roles) {
    traversePermissions(role.permissions, codeSet);
  }
  return Array.from(codeSet);
}

function traversePermissions(permissions, codeSet) {
  for (const permission of permissions) {
    codeSet.add(permission.code);
    if (permission.children) {
      traversePermissions(permission.children, codeSet);
    }
  }
}

// 创建用户小仓库
const useUserStore = defineStore("User", {
  // 小仓库存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN() || "", // 用户唯一标识token
      // 路由生成菜单
      menuRoutes: constantRoute,
      btnList: [],
      // 角色数组
      roleList: [],
      username: "",
    };
  },
  // 异步|逻辑
  actions: {
    // 用户登录的方法
    async userLogin(data: any) {
      const result: any = await reqLogin(data);
      // const result = { code: 200, data: "Demo Token", msg: "success" };
      // 登录请求: 成功 -> token
      if (result.code === 200) {
        // pinia仓库存储token
        this.token = result.data as string;
        SET_TOKEN(result.data as string);
        // 返回一个成功的promise
        return "ok";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    // 获取用户信息的方法
    async userInfo() {
      // const result = {
      //   code: 200,
      //   data: { username: "zhangsan" },
      //   msg: "success",
      // };
      const result: any = await reqUserInfo();
      const { code, data, msg } = result;
      if (code === 200) {
        this.username = data.username;
        const menuList = getPermissionCodes(data.roles);
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          menuList,
        );
        this.btnList = menuList as string[];
        if (data.roles && data.roles.length) {
          this.roleList = data.roles.map((el: any) => el.name);
        } else {
          this.roleList = [];
        }
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];
        [...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route);
        });
      } else {
        return Promise.reject(new Error(msg));
      }
    },
    // 退出登录
    async userLogout() {
      // 退出登录请求
      this.token = "";
      this.username = "";
      REMOVE_TOKEN();
      return "ok";
    },
  },
  getters: {},
});

export default useUserStore;
