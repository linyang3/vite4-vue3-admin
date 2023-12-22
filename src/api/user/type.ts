// 登录接口携带的参数ts类型
export interface loginFormData {
  email: string;
  password: string;
}

// 定义全部接口返回数据都有的数据类型
export interface ResponseData {
  code: number;
  msg: string;
}

// 登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string;
}

export interface roleList {
  code: string;
  name: string;
  permissionsList: permissionsList[];
}

export interface permissionsList {
  code: string;
  name: string;
  type: number;
  level: number;
  seq: number;
  path: string;
  icon: string;
  children: permissionsList[];
}

// 定义获取用户信息返回的数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    id: string;
    username: string;
    email: string;
    roles: roleList[];
  };
}

export interface userSearchForm {
  pageNo?: number;
  pageSize?: number;
  username?: string;
  email?: string;
  department?: string | null;
  status?: number | null | boolean;
  roleName?: any;
  vendorId?: string | null;
  id?: string;
  roleIds?: number[];
}

export interface userFormData {
  username?: string;
  email?: string;
  department?: string | null;
  status?: number | boolean;
  vendorId?: string;
  roleIds?: number[];
}

export interface user {
  id?: string;
  username: string;
  email: string;
  department: string;
  status: number;
  createTime: string;
  updateTime: string;
  role: string;
}

// 用户列表信息返回数据
export interface userListResponseData extends ResponseData {
  data: {
    rows: user[];
    pageNum: number;
    pageSize: number;
    pages: number;
    total: number;
  };
}
