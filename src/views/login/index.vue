<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到Demo</h2>
          <el-form-item prop="email">
            <el-input :prefix-icon="User" v-model="loginForm.email" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              show-password
              v-model="loginForm.password"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              class="login-btn"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
// 引入用户相关的小仓库
import useUserStore from "@/store/modules/user";
// 获取当前时间段的函数
import { getTime } from "@/utils/time";
let useStore = useUserStore();
// 获取路由器
let $router = useRouter();
let $route = useRoute();
// 收集表单数据
let loginForm = reactive({ email: "test@test.com", password: "111111" });
// 控制按钮加载效果
let loading = ref(false);
// 获取表单el-from
let loginForms = ref();
// 登录按钮
const login = async () => {
  await loginForms.value.validate();
  // 保证表单项检验成功发请求
  loading.value = true;
  // 仓库发送登录请求
  try {
    await useStore.userLogin(loginForm);
    // 跳转首页
    let redirect: any = $route.query.redirect;
    $router.push({ path: redirect || "/" });
    // 登录成功的提示
    ElNotification({
      type: "success",
      message: "欢迎回来",
      title: `HI,${getTime()}好`,
    });
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};
// 自定义检验规则函数
const validatorUserName = (_rule: any, value: any, callback: any) => {
  // rule为检验对象 value为表单文本内容 callback为放行通过|注入错误
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error("账号至少为五位"));
  }
};
const validatorPassword = (_rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error("密码至少为六位"));
  }
};
// 表单校验配置对象
const rules = {
  username: [
    // { required: true, message: "用户名不能为空", trigger: "blur" },
    // {
    //   required: true,
    //   min: 4,
    //   max: 10,
    //   message: "账号长度至少4位",
    //   trigger: "change",
    // },
    { trigger: "change", validator: validatorUserName },
  ],
  password: [
    // { required: true, message: "密码不能为空", trigger: "blur" },
    // {
    //   required: true,
    //   min: 6,
    //   max: 15,
    //   message: "密码长度至少6位",
    //   trigger: "change",
    // },
    { trigger: "change", validator: validatorPassword },
  ],
};
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
  .login-form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }
    .el-form-item {
      padding: 0 4vw;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
