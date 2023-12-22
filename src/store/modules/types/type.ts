import type { RouteRecordRaw } from "vue-router";
// 小仓库数据state类型
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  btnList: string[];
  roleList: string[];
}
