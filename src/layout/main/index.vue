<template>
  <!-- 路由子组件出口 -->
  <router-view v-slot="{ Component }">
    <Transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag"></component>
    </Transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting";
import { watch, ref, nextTick } from "vue";
let layOutSettingStore = useLayOutSettingStore();
// 控制当前组件是否销毁重建
let flag = ref(true);
// 监听刷新state属性变化
watch(
  () => {
    return layOutSettingStore.refsh;
  },
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  },
);
</script>
<script lang="ts">
export default {
  name: "AppMain",
};
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
