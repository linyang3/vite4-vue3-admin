<template>
  <div class="user-management">
    <!-- 搜索条件 -->
    <n-card class="user-management-search">
      <n-form
        ref="userModelRef"
        inline
        :label-width="80"
        :model="userSearchModel"
        size="small"
        class="user-management-search-form"
      >
        <n-form-item label="角色">
          <n-select
            v-model:value="userSearchModel.roleName"
            placeholder="请选择角色"
            :options="roleOptions2"
            clearable
          />
        </n-form-item>
        <n-form-item label="邮箱">
          <n-input
            v-model:value="userSearchModel.email"
            placeholder="请输入邮箱"
            clearable
          />
        </n-form-item>
        <n-form-item label="所属供应商">
          <n-select
            v-model:value="userSearchModel.vendorId"
            placeholder="请选择所属供应商"
            :options="vendorOptions"
            clearable
          />
        </n-form-item>
        <n-form-item label="用户名">
          <n-input
            v-model:value="userSearchModel.username"
            placeholder="请输入用户名"
            clearable
          />
        </n-form-item>
        <n-form-item label="所属部门">
          <n-select
            v-model:value="userSearchModel.department"
            placeholder="请选择所属部门"
            :options="departmentOptions"
            clearable
          />
        </n-form-item>
        <n-form-item label="账号状态">
          <n-select
            v-model:value="userSearchModel.status"
            placeholder="请选择账号状态"
            :options="statusOptions"
            clearable
          />
        </n-form-item>
      </n-form>
      <div class="user-management-search-btns">
        <n-button @click="resetUserSearch" v-has="`user_list`">重置</n-button>
        <n-button type="primary" @click="searchUser" v-has="`user_list`">
          查询
        </n-button>
      </div>
    </n-card>
    <!-- 表格内容 -->
    <n-card class="user-management-content">
      <n-button type="primary" @click="onAddUserModal" v-has="`user_add`">
        <el-icon style="margin-right: 5px">
          <CirclePlus />
        </el-icon>
        新增
      </n-button>
      <n-data-table
        remote
        ref="table"
        :loading="userTableLoading"
        :columns="columns"
        :single-line="false"
        :pagination="paginationReactive"
        :data="userData"
        :bordered="true"
        style="margin-top: 20px"
      />
    </n-card>
    <!-- 弹出框 -->
    <n-modal
      v-model:show="addOrUpdateUserShow"
      style="width: 550px"
      :mask-closable="false"
      :show-icon="false"
      preset="dialog"
      class="user-management-modal"
      :title="renderTitle"
    >
      <n-form
        :model="userFormModel"
        ref="formRef"
        label-placement="left"
        :label-width="120"
      >
        <n-form-item label="用户名:" path="username">
          <n-input
            size="small"
            placeholder="请输入用户名"
            v-model:value="userFormModel.username"
          />
        </n-form-item>
        <n-form-item label="角色:" path="role">
          <n-select
            v-model:value="userFormModel.roleName"
            placeholder="请选择角色"
            :options="roleOptions"
            multiple
            filterable
            clearable
          />
        </n-form-item>
        <n-form-item label="所属供应商:" path="supplier">
          <n-input
            size="small"
            placeholder="请输入所属供应商"
            v-model:value="userFormModel.vendorId"
          />
        </n-form-item>
        <n-form-item label="邮箱:" path="email">
          <n-input
            :disabled="formModalTitle == '编辑'"
            size="small"
            placeholder="请输入邮箱"
            v-model:value="userFormModel.email"
          />
        </n-form-item>
        <n-form-item label="所属部门:" path="department">
          <n-input
            size="small"
            placeholder="请输入所属部门"
            v-model:value="userFormModel.department"
          />
        </n-form-item>
        <n-form-item label="账号状态:" path="department">
          <!-- <n-switch size="small" v-model:value="userFormModel.status" /> -->
          <div style="font-size: 12px; display: flex; align-items: center">
            <span style="margin-right: 10px">
              {{ userFormModel.status ? "启用" : "锁定" }}
            </span>
            <n-button
              size="small"
              type="primary"
              v-if="!userFormModel.status"
              @click="handleChangeStatus"
            >
              解除锁定
            </n-button>
          </div>
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, h, onMounted } from "vue";
import { useMessage, useDialog } from "naive-ui";
import moment from "moment";
import { reqRoleList } from "@/api/role";
import {
  reqUserList,
  reqUpdateUser,
  reqAddUser,
  reqDeleteUser,
  reqResetUser,
  reqDepartment,
  reqVendorList,
} from "@/api/user";
import { userSearchForm, userListResponseData, user } from "@/api/user/type";
import { roleListResponseData } from "@/api/role/type";
import { createColumns } from "./columns";
// import useUserStore from "@/store/modules/user";
// let userStore = useUserStore();
let userTableLoading = ref<boolean>(false);
const Message = useMessage();
const dialog = useDialog();
// 模态框
let addOrUpdateUserShow = ref<boolean>(false);
// 模态框标题
let formModalTitle = ref<string>("");
const userFormModel = reactive<userSearchForm>({
  id: "",
  username: "",
  email: "",
  roleName: null,
  vendorId: null,
  department: null,
  status: false,
});
let userSearchModel = reactive<userSearchForm>({
  username: "",
  email: "",
  roleName: null,
  vendorId: null,
  department: null,
  status: null,
});
let roleOptions = ref();
let roleOptions2 = ref();
let statusOptions = ref([
  {
    label: "启用",
    value: 1,
  },
  {
    label: "禁用",
    value: 0,
  },
]);
// 供应商下拉列表
let vendorOptions = ref();
// 部门下拉列表
let departmentOptions = ref();
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
const userData = ref<user[]>();
onMounted(() => {
  // 获取角色数据
  getRoleList();
  // 获取用户列表分页数据
  getUserList();
  // 获取部门列表
  getDepartmentList();
  // 获取供应商列表
  getVendorList();
});
const getUserList = async () => {
  userTableLoading.value = true;
  let result: userListResponseData = await reqUserList({
    pageNo: paginationReactive.page,
    pageSize: paginationReactive.pageSize,
    ...Object.fromEntries(
      Object.entries(userSearchModel).filter(
        ([, value]) => value !== "" && value !== null,
      ),
    ),
  });
  const { code, msg, data } = result;
  if (code == 200) {
    paginationReactive.pageCount = data.pages;
    data.rows.forEach((el: user) => {
      el.createTime = moment(el.createTime).format("YYYY-MM-DD HH:mm:ss");
      el.updateTime = moment(el.updateTime).format("YYYY-MM-DD HH:mm:ss");
    });
    userData.value = data.rows;
  } else {
    Message.error(msg);
  }
  userTableLoading.value = false;
};
// 获取部门列表
const getDepartmentList = async () => {
  let result = await reqDepartment();
  if (result.code == 200) {
    departmentOptions.value = result.data.map((el: any) => ({
      label: el.name,
      value: el.name,
    }));
  }
};
// 获取供应商列表
const getVendorList = async () => {
  let result = await reqVendorList();
  if (result.code == 200) {
    vendorOptions.value = result.data.map((el: any) => ({
      label: el.name,
      value: el.name,
    }));
  }
};
// 获取角色列表数据
const getRoleList = async () => {
  let result: roleListResponseData = await reqRoleList({
    pageNo: 1,
    pageSize: 999,
  });
  const { rows } = result.data;
  roleOptions.value = rows.map((el: any) => {
    return {
      label: el.name,
      value: el.id,
    };
  });
  roleOptions2.value = rows.map((el: any) => {
    return {
      label: el.name,
      value: el.name,
    };
  });
};
// 新增用户
const onAddUserModal = () => {
  addOrUpdateUserShow.value = true;
  Object.assign(userFormModel, {
    username: "",
    email: "",
    roleName: null,
    vendorId: "",
    department: "",
    status: false,
  });
  formModalTitle.value = "新增";
};
// 修改用户
const onUpdateUserModal = (row: any) => {
  addOrUpdateUserShow.value = true;
  formModalTitle.value = "编辑";
  Object.assign(userFormModel, row);
  if (row.role) {
    userFormModel.roleName = row.role
      .split(",")
      .map(
        (item: string) =>
          roleOptions.value.filter((el: any) => el.label == item)[0].value,
      );
  } else {
    userFormModel.roleName = "";
  }
  if (row.status == 1) {
    userFormModel.status = true;
  } else {
    userFormModel.status = false;
  }
};
// 删除用户
const onDeleteUserModal = (row: user) => {
  dialog.warning({
    title: "警告",
    content: () => {
      return h("div", [
        h(
          "div",
          { style: { color: "red", fontSize: "16px" } },
          `确定删除用户"${row.username}"吗?`,
        ),
      ]);
    },
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      let result = await reqDeleteUser({ id: row.id });
      if (result.code == 200) {
        getUserList();
        Message.success("删除成功");
      } else {
        Message.error("删除失败");
      }
    },
  });
};
// 重置密码
const onResetPassword = (row: user) => {
  dialog.warning({
    title: "警告",
    content: () => {
      return h("div", [
        h(
          "div",
          { style: { color: "red", fontSize: "16px" } },
          `确定重置用户"${row.username}"的密码吗?`,
        ),
      ]);
    },
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      let result = await reqResetUser({ id: row.id });
      if (result.code == 200) {
        getUserList();
        Message.success("重置成功");
      } else {
        Message.error("重置失败");
      }
    },
  });
};
// 修改状态
// const onUpdateUserStatus = async (row: user) => {
//   let result = await reqUpdateUser({
//     id: row.id,
//     status: row.status == 1 ? 0 : 1,
//   });
//   if (result.code == 200) {
//     getUserList();
//     Message.success("修改成功");
//   } else {
//     Message.error("修改失败");
//   }
// };
// 解除锁定
const handleChangeStatus = async () => {
  let result = await reqUpdateUser({
    id: userFormModel.id,
    status: userFormModel.status == 1 ? 0 : 1,
  });
  if (result.code == 200) {
    Message.success("解除成功");
    userFormModel.status = 1;
  } else {
    Message.error("解除失败");
  }
};
const columns = createColumns(
  onUpdateUserModal,
  onDeleteUserModal,
  onResetPassword,
  // onUpdateUserStatus,
);
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
// 取消
const cancleAddOrUpdate = () => {
  addOrUpdateUserShow.value = false;
};
// 确定
const submitAddOrUpdate = async () => {
  console.log(userFormModel);
  if (formModalTitle.value == "新增") {
    let result = await reqAddUser({
      username: userFormModel.username,
      email: userFormModel.email,
      department: userFormModel.department,
      status: userFormModel.status ? 1 : 0,
      vendorId: userFormModel.vendorId,
      roleIds: userFormModel.roleName,
    });
    if (result.code == 200) {
      addOrUpdateUserShow.value = false;
      getUserList();
      Message.success("添加成功");
    } else {
      Message.error("添加失败");
    }
  } else {
    let result = await reqUpdateUser({
      id: userFormModel.id,
      username: userFormModel.username,
      email: userFormModel.email,
      department: userFormModel.department ? userFormModel.department : null,
      status: userFormModel.status ? 1 : 0,
      vendorId: userFormModel.vendorId,
      roleIds: userFormModel.roleName,
    });
    if (result.code == 200) {
      addOrUpdateUserShow.value = false;
      getUserList();
      Message.success("修改成功");
    } else {
      Message.error("修改失败");
    }
  }
};
// 重置
const resetUserSearch = () => {
  paginationReactive.page = 1;
  paginationReactive.pageSize = 10;
  Object.assign(userSearchModel, {
    username: "",
    email: "",
    roleName: null,
    vendorId: null,
    department: null,
    status: null,
  });
  getUserList();
};
// 查询
const searchUser = () => {
  paginationReactive.page = 1;
  paginationReactive.pageSize = 10;
  getUserList();
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
</style>
