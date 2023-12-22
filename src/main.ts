import { createApp } from "vue";
import App from "@/App.vue";
// 引入element-plus插件与样式
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// SVG需要的配置代码
import "virtual:svg-icons-register";
// 引入自定义插件对象
import gloalComponent from "@/components";
import { setupNaive } from "@/plugins/naive";
// 引入模板全局样式
import "@/styles/index.scss";
// 引入路由
import router from "./router";
// 引入仓库
import pinia from "./store";

// 获取应用的实力对象
const app = createApp(App);
// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
});
setupNaive(app);
// 安装自定义插件
app.use(gloalComponent);
// 安装仓库
app.use(pinia);
// 注册模板路由
app.use(router);
// 引入路由鉴权文件
import "./permisstion";
//引入自定义指令文件
import { isHasButton } from "@/directive/has";
isHasButton(app);

// 将应用挂载到挂载点上
app.mount("#app");
