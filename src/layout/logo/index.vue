<template>
  <div class="logo" v-if="setting.logoHidden">
    <img
      :style="`width: ${LayOutSettingStore.fold ? '100%' : ''}`"
      :src="setting.logo"
    />
    <p :style="`display: ${LayOutSettingStore.fold ? 'none' : ''}`">
      {{ setting.title }}
    </p>
  </div>
</template>

<script setup lang="ts">
import setting from "@/setting";
import useLayOutSettingStore from "@/store/modules/setting";
let LayOutSettingStore: any = useLayOutSettingStore();
</script>
<script lang="ts">
export default {
  name: "Logo",
};
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    // width: 80%;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
