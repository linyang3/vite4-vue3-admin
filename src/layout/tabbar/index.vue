<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <bread-crumb></bread-crumb>
    </div>
    <div class="tabbar-right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
</script>
<script lang="ts">
export default {
  name: "Tabbar",
};
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  // background-image: linear-gradient(
  //   to right,
  //   rgb(232, 223, 223),
  //   rgb(201, 178, 178),
  //   rgb(197, 165, 165)
  // );
  background-color: #fff;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  .tabbar-left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabbar-right {
    display: flex;
    align-items: center;
  }
}
</style>
