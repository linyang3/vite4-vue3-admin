import { NButton } from "naive-ui";
import { h } from "vue";
import pinia from "@/store";
// 获取用户的小仓库
import useUserStore from "@/store/modules/user";
const userStore = useUserStore(pinia);

export const createColumns = (
  onUpdateUserModal,
  onDeleteUserModal,
  onResetPassword,
  // onUpdateUserStatus,
) => [
  {
    title: "用户名",
    key: "username",
    align: "center",
  },
  {
    title: "角色",
    key: "role",
    align: "center",
  },
  {
    title: "所属供应商(供应商编码)",
    width: "300px",
    key: "vendorId",
    align: "center",
  },
  {
    title: "邮箱",
    key: "email",
    align: "center",
    width: "200px",
    ellipsis: {
      tooltip: {
        arrowStyle: "background:rgb(250,250,252)",
      },
    },
  },
  {
    title: "所属部门",
    key: "department",
    align: "center",
    ellipsis: {
      tooltip: {
        arrowStyle: "background:rgb(250,250,252)",
      },
    },
  },
  // {
  //   title: "账号状态",
  //   key: "status",
  //   align: "center",
  //   render(row) {
  //     return [
  //       h(NSwitch, {
  //         size: "small",
  //         defaultValue: row.status == 1 ? true : false,
  //         onUpdateValue: () => onUpdateUserStatus(row),
  //       }),
  //     ];
  //   },
  // },
  {
    title: "操作",
    key: "control",
    align: "center",
    render(row) {
      return [
        h(
          NButton,
          {
            size: "small",
            type: "primary",
            style: {
              marginRight: "6px",
              display: `${
                userStore.btnList.includes("user_update") ? "" : "none"
              }`,
            },
            onClick: () => onUpdateUserModal(row),
          },
          { default: () => "编辑" },
        ),
        h(
          NButton,
          {
            size: "small",
            type: "primary",
            style: {
              marginRight: "6px",
              display: `${
                userStore.btnList.includes("user_delete") ? "" : "none"
              }`,
            },
            onClick: () => onDeleteUserModal(row),
          },
          { default: () => "删除" },
        ),
        h(
          NButton,
          {
            size: "small",
            type: "primary",
            style: {
              display: `${
                userStore.btnList.includes("user_reset_password") ? "" : "none"
              }`,
            },
            onClick: () => onResetPassword(row),
          },
          { default: () => "重置" },
        ),
      ];
    },
    width: "200px",
  },
];
