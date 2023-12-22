import { h } from "vue";
import { NButton } from "naive-ui";
import router from "@/router";
function goEditPage({ contractId }) {
  router.push({ path: "/content-management/edit", query: { contractId } });
}

export const createColumns = () => [
  {
    title: "Contract ID",
    key: "contractId",
    align: "center",
    width: "120px",
  },
  {
    title: "项目名称",
    key: "projectName",
    align: "center",
    width: "200px",
  },
  {
    title: "合同开始时间",
    key: "contractStartDateEnd",
    align: "center",
    width: "150px",
  },
  {
    title: "Planning ID",
    key: "contractId",
    align: "center",
    width: "150px",
  },
  {
    title: "项目系列",
    key: "planningDesc",
    align: "center",
    width: "200px",
  },
  {
    title: "部门",
    key: "department",
    align: "center",
    width: "100px",
  },
  {
    title: "申请人",
    key: "applyBy",
    align: "center",
    width: "100px",
  },
  {
    title: "合同状态",
    key: "contractStatus",
    align: "center",
    width: "100px",
  },
  {
    title: "单据状态",
    key: "sheetStatus",
    align: "center",
    width: "100px",
  },
  {
    title: "合同方(供应商)",
    key: "vendorName",
    align: "center",
    width: "150px",
  },
  {
    title: "操作",
    key: "control",
    align: "center",
    width: "150px",
    render(item) {
      return [
        h(
          NButton,
          {
            size: "small",
            type: "primary",
            onClick: () => goEditPage(item),
          },
          "编辑",
        ),
      ];
    },
  },
];

// 合同状态mapping
export const contractStatusMapping = {
  HAVING: "进行中",
  CANCEL: "取消",
  COMPLETE: "完成",
};

// 单据状态mapping
export const sheetStatusMapping = {
  TEMPORARY_STORAGE: "草稿",
  SUB_MITTED: "提交待审核",
  UNDER_REVIEW: "审阅中",
  REVIEW_COMPLETED: "审阅完成",
  RE_BACK: "退回修改",
  REJECT: "拒绝",
  UNDO: "撤回",
  INVALID: "作废",
};
