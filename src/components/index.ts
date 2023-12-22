import SvgIcon from "./SvgIcon/index.vue";
import Pagination from "./Pagination/index.vue";
// 引入element-plus全部图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const allGloblComponent: any = { SvgIcon, Pagination };

// 对外暴露插件对象
export default {
  // 务必叫install方法
  install(app: any) {
    // 注册全部的全局组件
    Object.keys(allGloblComponent).forEach((key: any) => {
      app.component(key, allGloblComponent[key]);
    });
    // 注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
