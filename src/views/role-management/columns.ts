import { NButton } from "naive-ui";
import { h } from "vue";
import pinia from "@/store";
// 获取用户的小仓库
import useUserStore from "@/store/modules/user";
const userStore = useUserStore(pinia);

export const createColumns = (
  onUpdateRoleModal,
  onDeleteRoleModal,
  onUpdateRolePermission,
) => [
  {
    title: "角色ID",
    width: "80px",
    key: "id",
    align: "center",
  },
  {
    title: "角色名称",
    width: "120px",
    key: "name",
    align: "center",
  },
  {
    title: "角色描述",
    width: "300px",
    key: "remark",
    align: "center",
  },
  {
    title: "更新时间",
    key: "updateTime",
    align: "center",
    width: "200px",
    ellipsis: {
      tooltip: {
        // arrowStyle: "background:rgb(250,250,252)",
      },
    },
  },
  {
    title: "维护人",
    key: "updateUser",
    align: "center",
    width: "160px",
    ellipsis: {
      tooltip: {
        // arrowStyle: "background:rgb(250,250,252)",
      },
    },
  },
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
                userStore.btnList.includes("role_permission") ? "" : "none"
              }`,
            },
            onClick: () => onUpdateRolePermission(row),
          },
          { default: () => "权限" },
        ),
        h(
          NButton,
          {
            size: "small",
            type: "primary",
            style: {
              marginRight: "6px",
              display: `${
                userStore.btnList.includes("role_update") ? "" : "none"
              }`,
            },
            onClick: () => onUpdateRoleModal(row),
          },
          { default: () => "编辑" },
        ),
        h(
          NButton,
          {
            size: "small",
            type: "primary",
            style: {
              display: `${
                userStore.btnList.includes("role_delete") ? "" : "none"
              }`,
            },
            onClick: () => onDeleteRoleModal(row),
          },
          { default: () => "删除" },
        ),
      ];
    },
    width: "200px",
  },
];
