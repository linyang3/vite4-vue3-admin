<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有一个子路由 -->
    <template
      v-if="
        item.children &&
        item.children.filter((el: any) => !el.meta.hidden).length == 1
      "
    >
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有多个子路由 -->
    <el-sub-menu
      :index="item.path"
      v-if="
        item.children &&
        item.children.filter((el: any) => !el.meta.hidden).length > 1
      "
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <app-menu :menuList="item.children"></app-menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
// 获取路由对象
let $router = useRouter();
// 获取父组件传递的路由数据
defineProps(["menuList"]);
// 点击菜单回调
const goRoute = (vc: any) => {
  $router.push(vc.index);
};
</script>
<script lang="ts">
export default {
  name: "AppMenu",
};
</script>

<style scoped lang="scss"></style>
