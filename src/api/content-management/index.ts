import request from "@/utils/request";
import { QueryContentManagent, ContentManagentList } from "./type";
enum API {
  CONTENTMANAGEMENT_URL = "/content-management/list",
}

// 获取内容管理数据列表
export const reqGetContentManagent = (data: QueryContentManagent) =>
  request.post<ContentManagentList, any>(API.CONTENTMANAGEMENT_URL, data);
