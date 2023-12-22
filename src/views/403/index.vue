<template>
  <div class="page-container">
    <div class="text-center">
      <img src="~@/assets/images/exception/403.svg" alt="" />
    </div>
    <div class="text-center">
      <h1>抱歉，你无权访问该页面</h1>
      <el-button type="primary" @click="goHome">回到首页</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  border-radius: 4px;
  padding: 50px 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  .text-center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1 {
      color: #666;
      padding: 20px 0;
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  img {
    width: 550px;
    margin: 0 auto;
  }
}
</style>
