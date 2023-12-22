// 登录接口携带的参数ts类型
// 定义全部接口返回数据都有的数据类型
export interface ResponseData {
  code: number;
  msg: string;
}

export interface roleListData {
  pageNo: number;
  pageSize: number;
}

export interface role {
  id?: number | null;
  code?: string;
  name?: string;
  remark?: string | null;
  maintenance?: string;
  createTime?: string;
  createUser?: null;
  updateTime?: string;
  updateUser?: string | null;
}

// 定义获取用户信息返回的数据类型
export interface roleListResponseData extends ResponseData {
  data: {
    pageNum: number;
    pageSize: number;
    pages: number;
    total: number;
    rows: role[];
  };
}
