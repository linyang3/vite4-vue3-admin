export interface ResponseData {
  code: number;
  msg: string;
}

export interface QueryContentReport {
  pageNo?: number;
  pageSize?: number;
  contractId?: string;
  planningId?: string;
  projectName?: string;
  planningDesc?: string;
  contractStatus?: string;
  sheetStatus?: string;
  documentId?: string;
  documentStatus?: string;
  channel?: string;
  vendorName?: string;
  brand?: string;
  docProductIndication?: string;
  releaseMonthStart?: string;
  releaseMonthEnd?: string;
  contractStartDateStart?: string;
  contractStartDateEnd?: string;
  docExpirationDateStart?: string;
  docExpirationDateEnd?: string;
  releaseMonthTime?: string;
  contractStartTime?: string;
  docExpirationTime?: string;
}

export interface contentReportItem {
  businessId?: string;
  documentId?: string;
  documentName?: string;
  brand?: string;
  documentProduct?: string;
  docProductIndication?: string;
  docExpirationDate?: string;
  docVersionModifiedDate?: string;
  contractId?: string;
  projectName?: string;
  planningId?: string;
  planningDesc?: string;
  department?: string;
  applyBy?: string;
  contractStatus?: string;
  vendorName?: string;
  belongDepartment?: string;
  channel?: string;
  channelDesc?: string;
  channelType?: string;
  isToutiao?: string;
  link?: string;
  releaseStartDate?: string;
  releaseEndDate?: string;
  wechatArticleWowCount?: string;
  wechatViewCount?: string;
  wechatViewUser?: string;
  wechatLinkClickRate?: string;
  wechatVideoViewCount?: string;
  wechatVideoViewUserCount?: string;
  wechatVideoViewAverageSecond?: number;
  thirdPartArticleViewCount?: number;
  thirdPartArticleViewUserCount?: number;
  thirdPartAverageCompletedRate?: number;
  thirdPartArticleOpeningRate?: number;
  thirdPartArticleLikeCount?: number;
  thirdPartVideoViewCount?: number;
  thirdPartVideoViewUserCount?: number;
  thirdPartVideoViewAverageSecond?: number;
  thirdPartVideoViewValidCount?: number;
  thirdPartVideoViewValidUserCount?: number;
  contentReleaseFee?: number;
  contentMakeFee?: number;
  comment?: string;
  attachments?: attachmentsItem[];
}

// 附件信息
export interface attachmentsItem {
  name: string;
  url: string;
}

// 内容管理返回数据
export interface ContentReportList extends ResponseData {
  data: {
    rows: contentReportItem[];
    pageNum: number;
    pageSize: number;
    pages: number;
    total: number;
  };
}
