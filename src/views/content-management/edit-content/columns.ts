import { h } from "vue";
import { NButton } from "naive-ui";
export const createColumns = () => [
  {
    title: "Contract ID",
    key: "contractId",
    align: "center",
    width: "120px",
  },
  {
    title: "操作",
    key: "control",
    align: "center",
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
