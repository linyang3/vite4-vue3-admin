<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div
      class="layout-slider"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单 -->
        <el-menu
          :default-active="$route.path"
          unique-opened
          background-color="#001529"
          text-color="white"
          active-text-color="yellowgreen"
          :collapse="LayOutSettingStore.fold"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout-tabber"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示 -->
    <div
      class="layout-main"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 获取路由对象
import { useRoute } from "vue-router";
import Logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import Main from "./main/index.vue";
// 顶部
import Tabbar from "./tabbar/index.vue";
// 获取用户相关的小仓库
import useUserStore from "@/store/modules/user";
import useLayOutSettingStore from "@/store/modules/setting";
let LayOutSettingStore: any = useLayOutSettingStore();
let userStore = useUserStore();
let $route = useRoute();
</script>
<script lang="ts">
export default {
  name: "Layout",
};
</script>

<style scoped lang="scss">
.layout-container {
  width: 125%;
  transform: scale(0.8); /* 将页面内容整体缩小到80% */
  transform-origin: top left; /* 设置缩放原点为左上角 */
  height: 100vh;
  .layout-slider {
    width: $base-menu-width;
    height: 125vh;
    background-color: $base-menu-background;
    transition: all 0.3s;
    box-shadow: 5px 0 5px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 99;
    .scrollbar {
      width: 100%;
      height: calc(125vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
        padding-left: 0 !important;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout-tabber {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    z-index: 9;
    &.fold {
      width: calc(125vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout-main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(125vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    background-color: #f5f5f5;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(125vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
