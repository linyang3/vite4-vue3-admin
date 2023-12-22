import { h } from "vue";

export const createColumns = () => [
  {
    title: "VVPM Code",
    key: "documentId",
    align: "center",
    width: "150px",
  },
  {
    title: "文件名称",
    key: "documentName",
    align: "center",
    width: "200px",
  },
  {
    title: "品牌",
    key: "brand",
    align: "center",
    width: "100px",
  },
  {
    title: "疾病领域",
    key: "documentProduct",
    align: "center",
    width: "100px",
  },
  {
    title: "适应症",
    key: "docProductIndication",
    align: "center",
    width: "200px",
  },
  {
    title: "文件过期日期",
    key: "docExpirationDate",
    align: "center",
    width: "200px",
  },
  {
    title: "文件更新日期",
    key: "docVersionModifiedDate",
    align: "center",
    width: "200px",
  },
  {
    title: "Contract ID",
    key: "contractId",
    align: "center",
    width: "350px",
  },
  {
    title: "项目名称",
    key: "projectName",
    align: "center",
    width: "200px",
  },
  {
    title: "Planning ID",
    key: "planningId",
    align: "center",
    width: "150px",
  },
  {
    title: "项目系列",
    key: "planningDesc",
    align: "center",
    width: "200px",
  },
  {
    title: "部门",
    key: "department",
    align: "center",
    width: "100px",
  },
  {
    title: "申请人",
    key: "applyBy",
    align: "center",
    width: "150px",
  },
  {
    title: "合同状态",
    key: "contractStatus",
    align: "center",
    width: "100px",
  },
  {
    title: "合同方(供应商)",
    key: "vendorName",
    align: "center",
    width: "150px",
  },
  {
    title: "渠道标注",
    key: "channelDesc",
    align: "center",
    width: "100px",
  },
  {
    title: "类别",
    key: "channelType",
    align: "center",
    width: "100px",
  },
  {
    title: "头条(Y/N)(如果微信投放则需要)",
    key: "isToutiao",
    align: "center",
    width: "250px",
  },
  {
    title: "链接(如果微信投放则需要)",
    key: "link",
    align: "center",
    width: "250px",
  },
  {
    title: "投放日期",
    key: "releaseStartDate",
    align: "center",
    width: "250px",
  },
  {
    title: "投放结束日期",
    key: "releaseEndDate",
    align: "center",
    width: "250px",
  },
  {
    title: "图文在看数# (WoW)",
    key: "wechatArticleWowCount",
    align: "center",
    width: "200px",
  },
  {
    title: "原文阅读次数# (PV)",
    key: "wechatViewCount",
    align: "center",
    width: "200px",
  },
  {
    title: "原文阅读人数# (PV)",
    key: "wechatViewUser",
    align: "center",
    width: "200px",
  },
  {
    title: "阅读原文链接点击率",
    key: "wechatLinkClickRate",
    align: "center",
    width: "200px",
  },
  {
    title: "视频观看人次 (#)",
    key: "wechatVideoViewCount",
    align: "center",
    width: "200px",
  },
  {
    title: "视频观看人数 (#)",
    key: "wechatVideoViewUserCount",
    align: "center",
    width: "200px",
  },
  {
    title: "视频平均观看时长(秒)",
    key: "wechatVideoViewAverageSecond",
    align: "center",
    width: "200px",
  },
  {
    title: "图文阅读次数#(PV)",
    key: "thirdPartArticleViewCount",
    align: "center",
    width: "200px",
  },
  {
    title: "图文阅读人数#(UV)",
    key: "thirdPartArticleViewUserCount",
    align: "center",
    width: "200px",
  },
  {
    title: "平均阅读完成率%(完成率%)",
    key: "thirdPartAverageCompletedRate",
    align: "center",
    width: "200px",
  },
  {
    title: "图文打开率%",
    key: "thirdPartArticleOpeningRate",
    align: "center",
    width: "150px",
  },
  {
    title: "图文点赞数#(Like)",
    key: "thirdPartArticleLikeCount",
    align: "center",
    width: "150px",
  },
  {
    title: "视频观看人次 (#)",
    key: "thirdPartVideoViewCount",
    align: "center",
    width: "150px",
  },
  {
    title: "视频观看人数 (#)",
    key: "thirdPartVideoViewUserCount",
    align: "center",
    width: "150px",
  },
  {
    title: "视频平均观看时长 (秒)",
    key: "thirdPartVideoViewAverageSecond",
    align: "center",
    width: "200px",
  },
  {
    title: "视频有效观看人次 (#)",
    key: "thirdPartVideoViewValidCount",
    align: "center",
    width: "200px",
  },
  {
    title: "视频有效观看人数 (#)",
    key: "thirdPartVideoViewValidUserCount",
    align: "center",
    width: "200px",
  },
  {
    title: "内容投放金额",
    key: "contentReleaseFee",
    align: "center",
    width: "150px",
  },
  {
    title: "内容制作费用",
    key: "contentMakeFee",
    align: "center",
    width: "150px",
  },
  {
    title: "附件",
    key: "attachments",
    align: "center",
    width: "150px",
    render(row) {
      let renderArr = [];
      if (row.attachments) {
        renderArr = row.attachments.map((el: any) => {
          return h(
            "a",
            {
              style: {
                display: "block",
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              },
              href: "https://www.baidu.com/",
              target: "_blank",
              // onClick: () => {
              //   console.log(el.name);
              // },
            },
            { default: () => el.name },
          );
        });
      }
      return h("div", null, ...[renderArr]);
    },
  },
  {
    title: "注释",
    key: "comment",
    align: "center",
    width: "150px",
  },
];
