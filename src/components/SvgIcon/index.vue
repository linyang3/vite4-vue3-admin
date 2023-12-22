<template>
  <!-- svg：图标外侧容器，内部需要use标签结合 -->
  <svg :style="{ width, height }">
    <!-- xlink:href执行用哪一个图标，属性值#icon-图标名字 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
// 接受父组件传递的参数
defineProps({
  // xlink:href属性值的前缀
  prefix: {
    type: String,
    default: "#icon-",
  },
  // 提供使用图标的name
  name: String,
  // 接受颜色
  color: {
    type: String,
    default: "",
  },
  // 图标宽度
  width: {
    type: String,
    default: "16px",
  },
  // 图标高度
  height: {
    type: String,
    default: "16px",
  },
});
</script>
