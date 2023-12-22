<template>
  <div class="content-management">
    <n-card class="content-management-search">
      <n-form
        ref="reportModelRef"
        inline
        :label-width="80"
        :model="reportSearchModel"
        class="content-management-search-form"
      >
        <n-form-item label="Contract ID">
          <n-input
            v-model:value="reportSearchModel.contractId"
            placeholder="请输入Contract ID"
            clearable
          />
        </n-form-item>
        <n-form-item label="Plan ID">
          <n-input
            v-model:value="reportSearchModel.planningId"
            placeholder="请输入Plan ID"
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
        <n-form-item label="项目系列">
          <n-input
            v-model:value="reportSearchModel.planningDesc"
            placeholder="请输入项目系列"
            clearable
          />
        </n-form-item>
        <n-form-item label="合同开始时间">
          <n-date-picker
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model:value="reportSearchModel.startTime"
            type="datetimerange"
            clearable
          />
        </n-form-item>
        <n-form-item label="合同状态">
          <n-select
            v-model:value="reportSearchModel.contractStatus"
            placeholder="请选择合同状态"
            :options="contractStatusOptions"
            clearable
          />
        </n-form-item>
        <n-form-item label="单据状态">
          <n-select
            v-model:value="reportSearchModel.sheetStatus"
            placeholder="请选择单据状态"
            :options="documentsStatusOptions"
            clearable
          />
        </n-form-item>
      </n-form>
      <div class="content-management-search-btns">
        <n-button @click="resetSearch">重置</n-button>
        <n-button type="primary" @click="searchContent">查询</n-button>
      </div>
    </n-card>
    <n-card class="content-management-content">
      <!-- <n-button type="primary">
        <el-icon style="margin-right: 5px">
          <CirclePlus />
        </el-icon>
        新增
      </n-button> -->
      <n-data-table
        remote
        ref="table"
        :loading="reportTableLoading"
        :columns="columns"
        :single-line="false"
        :pagination="paginationReactive"
        :data="reportData"
        :bordered="true"
        style="margin-top: 20px"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useMessage } from "naive-ui";
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

const Message = useMessage();
// 表格loading
let reportTableLoading = ref<boolean>(false);
// 表格分页
const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageCount: 100,
  pageSizes: [
    {
      label: "10条/页",
      value: 10,
    },
    {
      label: "20条/页",
      value: 20,
    },
    {
      label: "30条/页",
      value: 30,
    },
  ],
});
// 表格数据
const reportData = ref();
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
  getContentManagent();
});
// 获取内容管理数据列表
const getContentManagent = async () => {
  let result: ContentManagentList = await reqGetContentManagent({
    pageNo: paginationReactive.page,
    pageSize: paginationReactive.pageSize,
    ...Object.fromEntries(
      Object.entries(reportSearchModel).filter(
        ([, value]) => value !== "" && value !== null,
      ),
    ),
    contractStartDateStart: reportSearchModel.startTime
      ? moment(reportSearchModel.startTime[0]).toISOString()
      : undefined,
    contractStartDateEnd: reportSearchModel.startTime
      ? moment(reportSearchModel.startTime[1]).toISOString()
      : undefined,
    startTime: undefined,
  });
  const { code, msg, data } = result;
  if (code == 200) {
    paginationReactive.pageCount = data.pages;
    data.rows.forEach((el: contentManagementItem) => {
      el.contractStartDateEnd = moment(el.contractStartDateEnd).format(
        "YYYY-MM-DD HH:mm:ss",
      );
      el.contractStatus = contractStatusMapping[el.contractStatus];
      el.sheetStatus = sheetStatusMapping[el.sheetStatus];
    });
    reportData.value = data.rows;
  } else {
    Message.error(msg);
  }
};
// 重置
const resetSearch = () => {
  paginationReactive.page = 1;
  paginationReactive.pageSize = 10;
  Object.assign(reportSearchModel, {
    contractId: "",
    planningId: "",
    projectName: "",
    planningDesc: "",
    startTime: null,
    contractStatus: null,
    sheetStatus: null,
  });
  getContentManagent();
};
// 查询
const searchContent = () => {
  paginationReactive.page = 1;
  paginationReactive.pageSize = 10;
  getContentManagent();
};
// 表格项
const columns = createColumns();
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
</style>
