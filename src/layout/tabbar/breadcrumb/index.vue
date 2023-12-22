<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'fold' : 'Expand'"></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- <el-icon> -->
      <!-- <component :is="item.meta.icon"></component> -->
      <!-- </el-icon> -->
      <span :style="{ fontSize: '12px' }">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import useLayOutSettingStore from "@/store/modules/setting";
let LayOutSettingStore: any = useLayOutSettingStore();
// 获取路由对象
let $route = useRoute();
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold;
};
</script>
<script lang="ts">
export default {
  name: "Breadcrumb",
};
</script>

<style scoped lang="scss"></style>
