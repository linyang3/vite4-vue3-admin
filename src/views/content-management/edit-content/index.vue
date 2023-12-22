<template>
  <div class="content-management">
    <n-card class="content-management-search">
      <n-form
        ref="reportModelRef"
        label-width="100"
        label-placement="left"
        :model="reportSearchModel"
        class="content-management-search-form"
      >
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="24" label="Plan信息">
            <n-form-item label="Plan ID">
              <n-input
                v-model:value="reportSearchModel.planningId"
                placeholder="请输入Plan ID"
                clearable
              />
            </n-form-item>
            <n-form-item label="项目系列">
              <n-input
                v-model:value="reportSearchModel.planningDesc"
                placeholder="请输入项目系列"
                clearable
              />
            </n-form-item>
          </n-form-item-gi>

          <n-form-item-gi :span="24" label="Contract信息">
            <n-form-item label="Contract ID">
              <n-input
                v-model:value="reportSearchModel.contractId"
                placeholder="请输入Contract ID"
                clearable
              />
            </n-form-item>
            <n-form-item label="项目名称">
              <n-input
                v-model:value="reportSearchModel.projectName"
                placeholder="请输入项目名称"
                clearable
              />
            </n-form-item>

            <n-form-item label="部门">
              <n-input
                v-model:value="reportSearchModel.projectName"
                placeholder="请输入项目名称"
                clearable
              />
            </n-form-item>

            <n-form-item label="申请人">
              <n-input
                v-model:value="reportSearchModel.projectName"
                placeholder="请输入项目名称"
                clearable
              />
            </n-form-item>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="Content信息">
            <n-button type="primary" @click="handleShowSelectContent">
              选择内容
            </n-button>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>
    <n-card class="content-management-content">
      <n-data-table
        remote
        ref="table"
        :loading="reportTableLoading"
        :columns="columns"
        :single-line="false"
        :data="reportData"
        :bordered="true"
        :scroll-x="1800"
        style="margin-top: 20px"
      />

      <footer style="margin-top: 16px">
        <n-form-item label="备注" label-placement="left">
          <n-input
            v-model="comment"
            type="textarea"
            placeholder="基本的 Textarea"
          />
        </n-form-item>

        <div class="btn-wrap">
          <n-button ghost type="primary">取消</n-button>
          <n-button type="primary">提交</n-button>
        </div>
      </footer>
    </n-card>

    <select-content
      :show="selectContentShow"
      @hide="selectContentShow = false"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, h } from "vue";
import { useMessage, NButton } from "naive-ui";
import moment from "moment";
import {
  createColumns,
  contractStatusMapping,
  sheetStatusMapping,
} from "./columns";
import { reqGetContentManagent } from "@/api/content-management";
import {
  ContentManagentList,
  contentManagementItem,
} from "@/api/content-management/type";
import selectContent from "./components/select-content.vue";
const Message = useMessage();
// 表格loading
let reportTableLoading = ref<boolean>(false);
// 表格数据
const reportData = ref();

const comment = ref("");
let reportSearchModel = reactive({
  contractId: "",
  planningId: "",
  projectName: "",
  planningDesc: "",
  startTime: null,
  contractStatus: null,
  sheetStatus: null,
});
let contractStatusOptions = ref([
  {
    label: "进行中",
    value: "HAVING",
  },
  {
    label: "取消",
    value: "CANCEL",
  },
  {
    label: "完成",
    value: "COMPLETE",
  },
]);
let documentsStatusOptions = ref([
  {
    label: "草稿",
    value: "TEMPORARY_STORAGE",
  },
  {
    label: "提交待审核",
    value: "SUB_MITTED",
  },
  {
    label: "审阅中",
    value: "UNDER_REVIEW",
  },
  {
    label: "审阅完成",
    value: "REVIEW_COMPLETED",
  },
  {
    label: "退回修改",
    value: "RE_BACK",
  },
  {
    label: "拒绝",
    value: "REJECT",
  },
  {
    label: "撤回",
    value: "UNDO",
  },
  {
    label: "作废",
    value: "INVALID",
  },
]);
onMounted(() => {
  // 获取内容管理数据列表
});
// 表格项
const columns = [
  {
    title: "VVPM Code",
    key: "",
    align: "center",
    width: "180px",
  },
  {
    title: "文件名称",
    key: "",
    align: "center",
    width: "180px",
  },
  {
    title: "品牌",
    key: "",
    align: "center",
    width: "120px",
  },
  {
    title: "疾病领域",
    key: "",
    align: "center",
    width: "120px",
  },
  {
    title: "适应症",
    key: "",
    align: "center",
    width: "120px",
  },
  {
    title: "文件过期日期",
    key: "",
    align: "center",
    width: "120px",
  },
  {
    title: "文件更新日期",
    key: "",
    align: "center",
    width: "120px",
  },
  {
    title: "所属部门",
    key: "",
    align: "center",
    width: "120px",
  },
  {
    title: "渠道分类",
    key: "",
    align: "center",
    width: "120px",
  },
  {
    title: "渠道标注",
    key: "",
    align: "center",
    width: "120px",
  },
  {
    title: "类别",
    key: "",
    align: "center",
    width: "120px",
  },
  {
    title: "头条Y/N(如果微信投放则需要)",
    key: "",
    align: "center",
    width: "220px",
  },
  {
    title: "链接(如果微信投放则需要)",
    key: "",
    align: "center",
    width: "200px",
  },
  {
    title: "投放开始日期",
    key: "",
    align: "center",
    width: "120px",
  },
  {
    title: "投放结束日期",
    key: "",
    align: "center",
    width: "120px",
  },
  {
    title: "最新记录的投放月度",
    key: "",
    align: "center",
    width: "180px",
  },
  {
    title: "内容状态",
    key: "",
    align: "center",
    width: "120px",
  },
  {
    title: "内容操作",
    key: "control",
    align: "center",
    fixed: "right",
    width: "150px",
    render() {
      return [
        h(
          NButton,
          {
            size: "small",
            type: "primary",
          },
          "编辑",
        ),
      ];
    },
  },
];

const selectContentShow = ref(false);

function handleShowSelectContent() {
  selectContentShow.value = true;
}
</script>

<style scoped lang="scss">
.content-management {
  &-search {
    &-form {
      display: flex;
      flex-wrap: wrap;
      // width: 80%;
      .n-select {
        width: 300px;
      }
      .n-input {
        width: 300px;
      }
      .n-date-picker {
        width: 300px;
      }
    }
    &-btns {
      margin-top: 20px;
      display: flex;
      // width: 75%;
      justify-content: center;
      .n-button {
        width: 100px;
        margin: 0 30px;
      }
    }
  }
  &-content {
    margin-top: 10px;
  }
}

.btn-wrap {
  text-align: center;
  button {
    margin-right: 24px;
    width: 120px;
  }
}
</style>
