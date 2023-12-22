export interface ResponseData {
  code: number;
  msg: string;
}

export interface QueryContentManagent {
  pageNo?: number;
  pageSize?: number;
  contractId?: string;
  planningId?: string;
  projectName?: string;
  Planning?: string;
  planningDesc?: string;
  contractStatus?: string;
  sheetStatus?: string;
  contractStartDateStart?: string;
  contractStartDateEnd?: string;
  startTime?: string;
}

export interface contentManagementItem {
  contractId: string;
  projectName: string;
  planningId: string;
  planningDesc: string;
  department: string;
  applyBy: string;
  vendorName: string;
  contractStatus: string;
  sheetStatus: string;
  contractStartDateEnd: string;
  contractEndDate: string;
}

// 内容管理返回数据
export interface ContentManagentList extends ResponseData {
  data: {
    rows: contentManagementItem[];
    pageNum: number;
    pageSize: number;
    pages: number;
    total: number;
  };
}
