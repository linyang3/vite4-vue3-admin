<template>
  <el-button
    size="default"
    icon="Refresh"
    circle
    @click="updateRefsh"
  ></el-button>
  <el-button
    size="default"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <!-- <el-button size="default" icon="Setting" circle></el-button> -->
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 10px"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
// 获取用户相关的小仓库
import useUserStore from "@/store/modules/user";
import useLayOutSettingStore from "@/store/modules/setting";
let layOutSettingStore = useLayOutSettingStore();
let userStore = useUserStore();
let $router = useRouter();
// 获取路由对象
let $route = useRoute();
// 刷新按钮
const updateRefsh = () => {
  layOutSettingStore.refsh = !layOutSettingStore.refsh;
};
// 全屏
const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
// 退出登录
const logout = async () => {
  // 向服务器发请求(退出登录)
  // 清空相关的数据
  await userStore.userLogout();
  // 跳转登录页面
  $router.push({ path: "/login", query: { redirect: $route.path } });
};
</script>
<script lang="ts">
export default {
  name: "Setting",
};
</script>

<style scoped lang="scss"></style>
