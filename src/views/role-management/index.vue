<template>
  <div class="user-management">
    <!-- 表格内容 -->
    <n-card class="user-management-content">
      <n-button type="primary" @click="onAddUserModal" v-has="`role_add`">
        <el-icon style="margin-right: 5px">
          <CirclePlus />
        </el-icon>
        新增
      </n-button>
      <n-data-table
        remote
        ref="table"
        :columns="columns"
        :single-line="false"
        :pagination="paginationReactive"
        :data="roleData"
        :bordered="true"
        :loading="roleTableLoading"
        @update:page="pageChange"
        @update:page-size="pageSizeChange"
        style="margin-top: 20px"
      />
    </n-card>
    <!-- 编辑|新增角色弹出框 -->
    <n-modal
      v-model:show="addOrUpdateRoleShow"
      style="width: 550px"
      :mask-closable="false"
      :show-icon="false"
      preset="dialog"
      class="user-management-modal"
      :title="renderTitle"
    >
      <n-form
        :model="roleFormModel"
        ref="formRef"
        label-placement="left"
        :label-width="120"
      >
        <n-form-item label="角色ID:" path="id" v-if="formModalTitle == '编辑'">
          <n-input
            disabled
            size="small"
            placeholder="请输角色ID"
            v-model:value="roleFormModel.id"
          />
        </n-form-item>
        <n-form-item label="角色名称:" path="name">
          <n-input
            size="small"
            placeholder="请输入角色名称"
            v-model:value="roleFormModel.name"
          />
        </n-form-item>
        <n-form-item label="角色描述:" path="remark">
          <n-input
            size="small"
            placeholder="请输入角色描述"
            v-model:value="roleFormModel.remark"
          />
        </n-form-item>
        <n-form-item label="维护人:" path="createUser">
          <n-input
            disabled
            size="small"
            placeholder="请输入联系方式"
            v-model:value="roleFormModel.maintenance"
          />
        </n-form-item>
        <n-form-item label="备注:" path="comments">
          <n-input
            size="small"
            placeholder="请输入备注"
            v-model:value="roleFormModel.comments"
          />
        </n-form-item>
      </n-form>
      <template #action>
        <div class="modal-buttons">
          <n-button size="small" @click="cancleAddOrUpdate">取消</n-button>
          <n-button size="small" type="primary" @click="submitAddOrUpdate">
            确定
          </n-button>
        </div>
      </template>
    </n-modal>
    <!-- 权限弹出框 -->
    <n-modal
      v-model:show="handleChangeRolePermission"
      style="width: 550px"
      :mask-closable="false"
      :show-icon="false"
      preset="dialog"
      class="role-permission-modal"
      :title="renderPermissionTitle"
    >
      <n-form label-placement="left" :label-width="120">
        <n-form-item label="角色名称:">
          <div style="margin-left: 25px">{{ currentRoleName }}</div>
        </n-form-item>
        <n-form-item label="角色权限:">
          <n-tree
            block-line
            :cascade="false"
            checkable
            key-field="id"
            label-field="name"
            :default-checked-keys="defaultCheckedKeys"
            :data="treeData"
            @update:checked-keys="updateCheckedKeys"
          />
        </n-form-item>
      </n-form>
      <template #action>
        <div class="modal-buttons">
          <n-button size="small" @click="handleCancle">取消</n-button>
          <n-button size="small" type="primary" @click="handleSubmit">
            确定
          </n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, h } from "vue";
import { useMessage, useDialog } from "naive-ui";
import moment from "moment";
import {
  reqRoleList,
  reqUpdateRole,
  reqAddRole,
  reqDeleteRole,
  reqPermissionList,
  reqPermissionRole,
  reqUpdatePermission,
} from "@/api/role";
import { roleListResponseData, role } from "@/api/role/type";
import { createColumns } from "./columns";
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
const Message = useMessage();
const dialog = useDialog();
const roleData = ref<role[]>([]);
let roleTableLoading = ref<boolean>(false);
// 模态框
let addOrUpdateRoleShow = ref<boolean>(false);
let handleChangeRolePermission = ref<boolean>(false);
// 模态框标题
let formModalTitle = ref<string>("");
// 属性结构的权限
const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageCount: 0,
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
// 权限列表
let treeData = ref();
// 权限模态框的当前角色
let currentRoleName = ref<string>();
// 权限模态框的当前角色ID
let currentRoleID = ref<number | null>();
// 当前角色默认权限
let defaultCheckedKeys = ref<number[]>();
const roleFormModel = reactive({
  id: null,
  name: "",
  remark: "",
  maintenance: userStore.username,
  comments: "",
});
onMounted(() => {
  getRoleList();
  // 获取权限列表
  getPermissionList();
});
const pageChange = (page: number) => {
  paginationReactive.page = page;
  getRoleList();
};
const pageSizeChange = (size: number) => {
  paginationReactive.page = 1;
  paginationReactive.pageSize = size;
  getRoleList();
};
// 获取角色列表
const getRoleList = async () => {
  roleTableLoading.value = true;
  let result: roleListResponseData = await reqRoleList({
    pageNo: paginationReactive.page,
    pageSize: paginationReactive.pageSize,
  });
  const { code, msg, data } = result;
  if (code == 200) {
    paginationReactive.pageCount = data.pages;
    data.rows.forEach((el: role) => {
      el.createTime = moment(el.createTime).format("YYYY-MM-DD HH:mm:ss");
      el.updateTime = moment(el.updateTime).format("YYYY-MM-DD HH:mm:ss");
    });
    roleData.value = data.rows;
  } else {
    Message.error(msg);
  }
  roleTableLoading.value = false;
};
// 获取权限列表
const getPermissionList = async () => {
  let result = await reqPermissionList();
  if (result.code == 200) {
    treeData.value = result.data;
  }
};
// 新增角色
const onAddUserModal = () => {
  addOrUpdateRoleShow.value = true;
  formModalTitle.value = "新增";
  Object.assign(roleFormModel, {
    id: null,
    name: "",
    remark: "",
    maintenance: userStore.username,
    comments: "",
  });
};
// 删除角色
const onDeleteRoleModal = (row: role) => {
  dialog.warning({
    title: "警告",
    content: () => {
      return h("div", [
        h(
          "div",
          { style: { color: "red", fontSize: "16px" } },
          `删除后该角色所有的权限都会删除`,
        ),
        h(
          "div",
          { style: { color: "red", fontSize: "16px" } },
          `确定删除角色"${row.name}"吗?`,
        ),
      ]);
    },
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      let result = await reqDeleteRole({ id: row.id });
      if (result.code == 200) {
        getRoleList();
        Message.success("删除成功");
      } else {
        Message.error("删除失败");
      }
    },
  });
};
// 修改角色
const onUpdateRoleModal = (row: role) => {
  addOrUpdateRoleShow.value = true;
  formModalTitle.value = "编辑";
  Object.assign(roleFormModel, row);
  console.log(row);
};
// 修改角色权限
const onUpdateRolePermission = async (row: role) => {
  currentRoleName.value = row.name;
  currentRoleID.value = row.id;
  let result = await reqPermissionRole({ id: row.id });
  if (result.code == 200) {
    defaultCheckedKeys.value = treeToArr(result.data).map((el: any) => el.id);
    handleChangeRolePermission.value = true;
  } else {
    Message.error("获取角色权限失败");
  }
};
const columns = createColumns(
  onUpdateRoleModal,
  onDeleteRoleModal,
  onUpdateRolePermission,
);
// 取消
const cancleAddOrUpdate = () => {
  addOrUpdateRoleShow.value = false;
  roleFormModel.comments = "";
};
// 确定
const submitAddOrUpdate = async () => {
  if (formModalTitle.value == "新增") {
    let result = await reqAddRole(roleFormModel);
    if (result.code == 200) {
      addOrUpdateRoleShow.value = false;
      getRoleList();
      Message.success("添加成功");
    } else {
      Message.error("添加失败");
    }
  } else {
    let result = await reqUpdateRole(roleFormModel);
    addOrUpdateRoleShow.value = false;
    if (result.code == 200) {
      addOrUpdateRoleShow.value = false;
      getRoleList();
      Message.success("修改成功");
    } else {
      Message.error("修改失败");
    }
  }
};
// 标题
const renderTitle = () => {
  return h("div", { style: { display: "flex", alignItems: "center" } }, [
    h(
      "div",
      {
        style: {
          fontWeight: 900,
          borderLeft: "6px solid rgb(213, 43, 30)",
          paddingLeft: "10px",
          margin: "20px 20px 10px",
          lineHeight: "1.2rem",
          fontSize: "16px",
        },
      },
      { default: () => formModalTitle.value },
    ),
  ]);
};
// 权限标题
const renderPermissionTitle = () => {
  return h("div", { style: { display: "flex", alignItems: "center" } }, [
    h(
      "div",
      {
        style: {
          fontWeight: 900,
          borderLeft: "6px solid rgb(213, 43, 30)",
          paddingLeft: "10px",
          margin: "20px 20px 10px",
          lineHeight: "1.2rem",
          fontSize: "16px",
        },
      },
      { default: () => "角色权限" },
    ),
  ]);
};
// 权限模态框取消
const handleCancle = () => {
  handleChangeRolePermission.value = false;
};
// 权限模态框确定
const handleSubmit = async () => {
  let result = await reqUpdatePermission({
    id: currentRoleID.value,
    permissions: defaultCheckedKeys.value,
  });
  if (result.code == 200) {
    Message.success("修改成功");
    handleChangeRolePermission.value = false;
  } else {
    Message.error("修改失败");
  }
};
// 树形结构转为数组
const treeToArr = (data: any) => {
  const result: any = [];
  data.forEach((item) => {
    const loop = (data) => {
      result.push(data);
      let child = data.children;
      if (child) {
        for (let i = 0; i < child.length; i++) {
          loop(child[i]);
        }
      }
    };
    loop(item);
  });
  return result;
};
// 更新树型结构选择结果
const updateCheckedKeys = (v) => {
  defaultCheckedKeys.value = v;
};
</script>

<style scoped lang="scss">
.user-management {
  &-search {
    &-form {
      display: flex;
      flex-wrap: wrap;
      // width: 80%;
      .n-select {
        width: 180px;
      }
    }
    &-btns {
      margin-top: 20px;
      display: flex;
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
  &-modal {
    .n-form-item {
      margin-bottom: 10px;
    }
  }
}
.n-dialog {
  .modal-buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    // margin-right: 100px;
    .n-button {
      width: 100px;
      margin-left: 20px;
    }
  }
}
::v-deep .n-form-item-label {
  line-height: 26px;
  padding-bottom: 0;
  font-size: 12px;
}
::v-deep .n-form-item .n-form-item-feedback-wrapper {
  display: none !important;
}
::v-deep .n-data-table-tr th {
  background-color: rgb(238, 238, 238);
}
::v-deep .n-data-table:not(.n-data-table--single-line) .n-data-table-th {
  border-right: 1px solid rgb(0, 0, 0, 0.1);
}
::v-deep .n-data-table:not(.n-data-table--single-line) .n-data-table-td {
  border-right: 1px solid rgb(0, 0, 0, 0.1);
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);
}
</style>
