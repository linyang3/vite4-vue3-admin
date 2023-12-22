import request from "@/utils/request";
import { QueryContentReport, ContentReportList } from "./type";
enum API {
  CONTENTREPORT_URL = "/content-report/list",
  EXPORTCONTENTREPORT_URL = "/content-report/report",
}

// 获取内容报表数据列表
export const reqGetContentReport = (data: QueryContentReport) =>
  request.post<ContentReportList, any>(API.CONTENTREPORT_URL, data);
export const reqGetContentReportExport = (data: QueryContentReport) =>
  request.post<any, any>(API.EXPORTCONTENTREPORT_URL, data, {
    responseType: "blob",
  });
