<template>
  <n-modal :show="show">
    <n-card
      style="width: 600px"
      preset="dialog"
      title="添加内容"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form
        :model="formModel"
        :rules="formRules"
        label-placement="left"
        label-width="100"
      >
        <n-form-item label="VVPM Code">
          <n-input-group>
            <n-input placeholder="请输入" />
            <n-button type="primary">查询</n-button>
          </n-input-group>
        </n-form-item>
        <n-form-item label="品牌">
          <n-input disabled placeholder="输入VVPM Code后自动加载" />
        </n-form-item>
        <n-form-item label="适应症">
          <n-input disabled placeholder="输入VVPM Code后自动加载" />
        </n-form-item>
        <n-form-item label="文件名称">
          <n-input disabled placeholder="输入VVPM Code后自动加载" />
        </n-form-item>
        <n-form-item label="过期时间">
          <n-input disabled placeholder="输入VVPM Code后自动加载" />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button ghost type="primary" @click="onHide">取消</n-button>
          <n-button type="primary">添加</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, reactive } from "vue";
const props = defineProps({
  show: { type: Boolean },
});

const emits = defineEmits(["hide"]);

const formModel = reactive({});

const formRules = {};

function onHide() {
  emits("hide");
}
</script>

<style scoped lang="scss"></style>
