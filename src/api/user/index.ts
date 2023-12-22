// 用户相关的接口
import request from "@/utils/request";
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
  userSearchForm,
  userListResponseData,
} from "./type";
// 统一管理接口
enum API {
  // LOGIN_URL = "/user/login",
  // USERINFO_URL = "/user/info",
  LOGIN_URL = "/auth/dev-login?",
  USERINFO_URL = "/user",
  USERLIST_URL = "/user/list",
  // 修改用户
  UPDATEUSER_URL = "/user/update",
  // 添加用户
  ADDUSER_URL = "/user/add",
  // 删除用户
  DELETE_USER = "/user/delete",
  // 重置密码
  RESETPASSWORD = "/user/reset-password",
  // 获取部门列表
  DEPARTMENT_LIST = "/department/list",
  // 获取供应商列表
  VENDOR_LIST = "/vendor/list",
}

// 登录接口
export const reqLogin = (data: loginFormData) =>
  request.get<any, loginResponseData>(API.LOGIN_URL + `email=${data.email}`);
// 获取用户信息
export const reqUserInfo = () =>
  request.post<any, userInfoResponseData>(API.USERINFO_URL);

// 分页获取用户列表数据
export const reqUserList = (data: userSearchForm) =>
  request.post<any, userListResponseData>(API.USERLIST_URL, data);
// 修改用户
export const reqUpdateUser = (data: userSearchForm) =>
  request.post<any, any>(API.UPDATEUSER_URL, data);
// 添加用户
export const reqAddUser = (data: userSearchForm) =>
  request.post<any, any>(API.ADDUSER_URL, data);
// 删除用户
export const reqDeleteUser = (data: any) =>
  request.post<any, any>(API.DELETE_USER, data);
// 重置密码
export const reqResetUser = (data: any) =>
  request.post<any, any>(API.RESETPASSWORD, data);

// 获取部门列表
export const reqDepartment = () => request.post<any, any>(API.DEPARTMENT_LIST);

// 获取供应商列表
export const reqVendorList = () => request.post<any, any>(API.VENDOR_LIST);
