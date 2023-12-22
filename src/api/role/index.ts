// 用户相关的接口
import request from "@/utils/request";
import type { roleListResponseData, roleListData, role } from "./type";
// 统一管理接口
enum API {
  ROLELIST_URL = "/role/list",
  // 编辑角色
  UPDATEUSER_URL = "/role/update",
  // 新增角色
  ADDUSER_URL = "/role/add",
  // 删除角色
  DELETEUSER_URL = "/role/delete",
  // 获取权限列表
  GETPERMISSIONLIST_URL = "/permission/list",
  // 获取当前角色的权限数据
  GETPERMISSIONBYROLE_URL = "/role/permissions/list",
  // 修改角色权限数据
  UPDATEROLEPERMISSION_URL = "/role/permissions/update",
}

// 角色列表
export const reqRoleList = (data: roleListData) =>
  request.post<any, roleListResponseData>(API.ROLELIST_URL, data);
// 编辑角色
export const reqUpdateRole = (data: role) =>
  request.post<any, any>(API.UPDATEUSER_URL, data);
// 新增角色
export const reqAddRole = (data: role) =>
  request.post<any, any>(API.ADDUSER_URL, data);
export const reqDeleteRole = (data: role) =>
  request.post<any, any>(API.DELETEUSER_URL, data);

// 获取权限列表
export const reqPermissionList = () =>
  request.post<any, any>(API.GETPERMISSIONLIST_URL);
// 获取权限列表
export const reqPermissionRole = (data: role) =>
  request.post<any, any>(API.GETPERMISSIONBYROLE_URL, data);
// 修改角色权限
export const reqUpdatePermission = (data: any) =>
  request.post<any, any>(API.UPDATEROLEPERMISSION_URL, data);
