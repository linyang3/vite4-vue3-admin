<template>
  <NConfigProvider
    :theme-overrides="getThemeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-dialog-provider>
      <n-message-provider>
        <router-view />
      </n-message-provider>
    </n-dialog-provider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { zhCN, dateZhCN } from "naive-ui";
const getThemeOverrides = computed(() => {
  return {
    common: {
      primaryColor: "#d52b1e",
      primaryColorHover: "#d52b1e",
      primaryColorPressed: "#d52b1e",
    },
  };
});
</script>

<style scoped></style>
