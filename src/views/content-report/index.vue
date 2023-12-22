<template>
  <div class="content-report">
    <n-card class="content-report-search">
      <n-form
        ref="reportModelRef"
        inline
        :label-width="80"
        :model="reportSearchModel"
        size="small"
        class="content-report-search-form"
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
        <n-form-item label="VVPM Code">
          <n-input
            v-model:value="reportSearchModel.documentId"
            placeholder="请输入VVPM Code"
            clearable
          />
        </n-form-item>
        <n-form-item label="文件状态">
          <n-select
            v-model:value="reportSearchModel.documentStatus"
            placeholder="请选择文件状态"
            :options="fileStatusOptions"
            clearable
          />
        </n-form-item>
        <n-form-item label="渠道分类">
          <n-input
            v-model:value="reportSearchModel.channel"
            placeholder="请输入渠道分类"
            clearable
          />
        </n-form-item>
        <n-form-item label="供应商">
          <n-input
            v-model:value="reportSearchModel.vendorName"
            placeholder="请输入供应商"
            clearable
          />
        </n-form-item>
        <n-form-item label="品牌">
          <n-input
            v-model:value="reportSearchModel.brand"
            placeholder="请输入品牌"
            clearable
          />
        </n-form-item>
        <n-form-item label="适应症">
          <n-input
            v-model:value="reportSearchModel.docProductIndication"
            placeholder="请输入适应症"
            clearable
          />
        </n-form-item>
        <n-form-item label="投放月度">
          <n-date-picker
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            v-model:value="reportSearchModel.monthlyRelease"
            type="monthrange"
            clearable
          />
        </n-form-item>
        <n-form-item label="合同开始时间">
          <n-date-picker
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model:value="reportSearchModel.contractStartTime"
            type="daterange"
            clearable
          />
        </n-form-item>
        <n-form-item label="合同过期时间">
          <n-date-picker
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model:value="reportSearchModel.docExpirationTime"
            type="daterange"
            clearable
          />
        </n-form-item>
      </n-form>
      <div class="content-report-search-btns">
        <n-button @click="resetSearch">重置</n-button>
        <n-button type="primary" @click="searchContent">查询</n-button>
      </div>
    </n-card>
    <n-card class="content-report-content">
      <n-button
        :loading="exportLoading"
        type="primary"
        @click="exportContentList"
      >
        <el-icon style="margin-right: 5px">
          <Upload />
        </el-icon>
        导出
      </n-button>
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
        @update:page="pageChange"
        @update:page-size="pageSizeChange"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useMessage } from "naive-ui";
import moment from "moment";
import { saveAs } from "file-saver";
import { createColumns } from "./columns";
import {
  reqGetContentReport,
  reqGetContentReportExport,
} from "@/api/content-report";
import {
  ContentReportList,
  contentReportItem,
} from "@/api/content-report/type";
const Message = useMessage();
// 表格loading
let reportTableLoading = ref<boolean>(false);
// 导出按钮loading
let exportLoading = ref<boolean>(false);
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
// 查询的search列表
let reportSearchModel = reactive({
  contractId: "",
  planningId: "",
  projectName: "",
  planningDesc: "",
  contractStatus: null,
  sheetStatus: null,
  documentId: "",
  documentStatus: null,
  channel: "",
  vendorName: "",
  brand: "",
  docProductIndication: "",
  monthlyRelease: null,
  contractStartTime: null,
  docExpirationTime: null,
});
// 文件状态option
let fileStatusOptions = ref([
  {
    value: "Approved for Distribution",
    label: "Approved for Distribution",
  },
  {
    value: "Expired",
    label: "Expired",
  },
  {
    value: "Retired",
    label: "Retired",
  },
  {
    value: "In MLR Approval",
    label: "In MLR Approval",
  },
  {
    value: "In Periodic Review",
    label: "In Periodic Review",
  },
  {
    value: "Proof Attached",
    label: "Proof Attached",
  },
  {
    value: "Cancelled",
    label: "Cancelled",
  },
  {
    value: "Approved with Changes",
    label: "Approved with Changes",
  },
  {
    value: "Draft",
    label: "Draft",
  },
  {
    value: "Superseded",
    label: "Superseded",
  },
  {
    value: "Ready for MLR",
    label: "Ready for MLR",
  },
  {
    value: "Revise and Resubmit",
    label: "Revise and Resubmit",
  },
]);
// 合同状态option
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
// 文档状态option
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
  getContentReport();
});
// 获取内容管理数据列表
const getContentReport = async () => {
  reportTableLoading.value = true;
  let result: ContentReportList = await reqGetContentReport({
    pageNo: paginationReactive.page,
    pageSize: paginationReactive.pageSize,
    ...Object.fromEntries(
      Object.entries(reportSearchModel).filter(
        ([, value]) => value !== "" && value !== null,
      ),
    ),
    releaseMonthStart: reportSearchModel.monthlyRelease
      ? moment(reportSearchModel.monthlyRelease[0]).toISOString()
      : undefined,
    releaseMonthEnd: reportSearchModel.monthlyRelease
      ? moment(reportSearchModel.monthlyRelease[1]).toISOString()
      : undefined,
    releaseMonthTime: undefined,
    contractStartDateStart: reportSearchModel.contractStartTime
      ? moment(reportSearchModel.contractStartTime[0]).toISOString()
      : undefined,
    contractStartDateEnd: reportSearchModel.contractStartTime
      ? moment(reportSearchModel.contractStartTime[1]).toISOString()
      : undefined,
    contractStartTime: undefined,
    docExpirationDateStart: reportSearchModel.docExpirationTime
      ? moment(reportSearchModel.docExpirationTime[0]).toISOString()
      : undefined,
    docExpirationDateEnd: reportSearchModel.docExpirationTime
      ? moment(reportSearchModel.docExpirationTime[1]).toISOString()
      : undefined,
    docExpirationTime: undefined,
  });
  reportTableLoading.value = false;
  const { code, msg, data } = result;
  if (code == 200) {
    paginationReactive.pageCount = data.pages;
    data.rows.forEach((el: contentReportItem) => {
      el.docVersionModifiedDate = moment(el.docVersionModifiedDate).format(
        "YYYY-MM-DD HH:mm:ss",
      );
    });
    reportData.value = data.rows;
  } else {
    Message.error(msg);
  }
};
// 查询
const searchContent = () => {
  paginationReactive.page = 1;
  paginationReactive.pageSize = 10;
  getContentReport();
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
    contractStatus: null,
    sheetStatus: null,
    documentId: "",
    documentStatus: null,
    channel: "",
    vendorName: "",
    brand: "",
    docProductIndication: "",
    monthlyRelease: null,
    contractStartTime: null,
    docExpirationTime: null,
  });
  getContentReport();
};
// 分页
const pageChange = (page: number) => {
  paginationReactive.page = page;
  getContentReport();
};
// 分页
const pageSizeChange = (size: number) => {
  paginationReactive.page = 1;
  paginationReactive.pageSize = size;
  getContentReport();
};
// 导出报表
const exportContentList = async () => {
  try {
    exportLoading.value = true;
    let result = await reqGetContentReportExport({
      pageNo: paginationReactive.page,
      pageSize: paginationReactive.pageSize,
      ...Object.fromEntries(
        Object.entries(reportSearchModel).filter(
          ([, value]) => value !== "" && value !== null,
        ),
      ),
      releaseMonthStart: reportSearchModel.monthlyRelease
        ? moment(reportSearchModel.monthlyRelease[0]).toISOString()
        : undefined,
      releaseMonthEnd: reportSearchModel.monthlyRelease
        ? moment(reportSearchModel.monthlyRelease[1]).toISOString()
        : undefined,
      releaseMonthTime: undefined,
      contractStartDateStart: reportSearchModel.contractStartTime
        ? moment(reportSearchModel.contractStartTime[0]).toISOString()
        : undefined,
      contractStartDateEnd: reportSearchModel.contractStartTime
        ? moment(reportSearchModel.contractStartTime[1]).toISOString()
        : undefined,
      contractStartTime: undefined,
      docExpirationDateStart: reportSearchModel.docExpirationTime
        ? moment(reportSearchModel.docExpirationTime[0]).toISOString()
        : undefined,
      docExpirationDateEnd: reportSearchModel.docExpirationTime
        ? moment(reportSearchModel.docExpirationTime[1]).toISOString()
        : undefined,
      docExpirationTime: undefined,
    });
    saveAs(result, `Demo-内容报表-${moment().format("YYYYMMDDHHmmss")}.xlsx`);
  } catch (e) {
    Message.error("导出失败");
    console.log("导出失败", e);
  } finally {
    exportLoading.value = false;
  }
};
// 表格项
const columns = createColumns();
</script>

<style scoped lang="scss">
.content-report {
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
