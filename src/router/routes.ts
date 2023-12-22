// 配置路由(常量路由)
export const constantRoute = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "layout",
    meta: {
      title: "",
      hidden: false,
      icon: "",
    },
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: "HomeFilled",
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
    meta: {
      title: "登录",
      hidden: true,
      icon: "Promotion",
    },
  },
  {
    path: "/403",
    component: () => import("@/views/403/index.vue"),
    name: "403",
    meta: {
      title: "403",
      hidden: true,
      icon: "DocumentDelete",
    },
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      hidden: true,
      icon: "DocumentDelete",
    },
  },
  // {
  //   path: "/",
  //   component: () => import("@/layout/index.vue"),
  //   name: "content_management",
  //   meta: {
  //     title: "",
  //     hidden: false,
  //     icon: "",
  //   },
  //   redirect: "/content-management",
  //   children: [
  //     {
  //       path: "/content-management",
  //       component: () => import("@/views/content-management/index.vue"),
  //       meta: {
  //         title: "合同及内容管理",
  //         hidden: false,
  //         icon: "Document",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/content-report",
  //   component: () => import("@/layout/index.vue"),
  //   name: "content_report",
  //   meta: {
  //     title: "",
  //     hidden: false,
  //     icon: "",
  //   },
  //   redirect: "/content-report",
  //   children: [
  //     {
  //       path: "/content-report",
  //       component: () => import("@/views/content-report/index.vue"),
  //       meta: {
  //         title: "内容报表",
  //         hidden: false,
  //         icon: "DocumentCopy",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/user-management",
  //   component: () => import("@/layout/index.vue"),
  //   name: "user_management",
  //   meta: {
  //     title: "",
  //     hidden: false,
  //     icon: "",
  //   },
  //   redirect: "/user-management",
  //   children: [
  //     {
  //       path: "/user-management",
  //       component: () => import("@/views/user-management/index.vue"),
  //       meta: {
  //         title: "用户管理",
  //         hidden: false,
  //         icon: "User",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/role-management",
  //   component: () => import("@/layout/index.vue"),
  //   name: "role_management",
  //   meta: {
  //     title: "",
  //     hidden: false,
  //     icon: "",
  //   },
  //   redirect: "/role-management",
  //   children: [
  //     {
  //       path: "/role-management",
  //       component: () => import("@/views/role-management/index.vue"),
  //       meta: {
  //         title: "角色管理",
  //         hidden: false,
  //         icon: "Setting",
  //       },
  //     },
  //   ],
  // },
];

// 异步路由
export const asyncRoute = [
  // {
  //   path: "/",
  //   component: () => import("@/layout/index.vue"),
  //   name: "content",
  //   meta: {
  //     title: "",
  //     hidden: true,
  //     icon: "",
  //   },
  //   redirect: "/content-management",
  //   // children: [
  //   //   {
  //   //     path: "/content-management",
  //   //     name: "contentMgmt",
  //   //     component: () => import("@/views/content-management/index.vue"),
  //   //     meta: {
  //   //       title: "合同及内容管理",
  //   //       hidden: false,
  //   //       icon: "Document",
  //   //     },
  //   //   },
  //   //   {
  //   //     path: "/content-management/edit",
  //   //     name: "content",
  //   //     component: () => import("@/views/content-management/edit-content/index.vue"),
  //   //     meta: {
  //   //       title: "编辑内容",
  //   //       hidden: true,
  //   //     },
  //   //   },
  //   // ],
  // },
  {
    path: "/content-management",
    name: "content",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "",
      hidden: false,
      icon: "",
    },
    children: [
      {
        path: "/content-management/index",
        name: "content_list",
        component: () => import("@/views/content-management/index.vue"),
        meta: {
          title: "合同及内容管理",
          hidden: false,
          icon: "Document",
        },
      },
      {
        path: "/content-management/edit",
        name: "content_edit",
        component: () => import("@/views/content-management/edit-content/index.vue"),
        meta: {
          title: "编辑内容",
          hidden: true,
          icon: "Document",
        },
      },
    ],
  },
  {
    path: "/content-report",
    component: () => import("@/layout/index.vue"),
    name: "content_report",
    meta: {
      title: "",
      hidden: false,
      icon: "",
    },
    redirect: "/content-report",
    children: [
      {
        path: "/content-report",
        name: "content_report",
        component: () => import("@/views/content-report/index.vue"),
        meta: {
          title: "内容报表",
          hidden: false,
          icon: "DocumentCopy",
        },
      },
    ],
  },
  {
    path: "/user-management",
    component: () => import("@/layout/index.vue"),
    name: "user",
    meta: {
      title: "",
      hidden: false,
      icon: "",
    },
    redirect: "/user-management",
    children: [
      {
        path: "/user-management",
        name: "user",
        component: () => import("@/views/user-management/index.vue"),
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "User",
        },
      },
    ],
  },
  {
    path: "/role-management",
    component: () => import("@/layout/index.vue"),
    name: "role",
    meta: {
      title: "",
      hidden: false,
      icon: "",
    },
    redirect: "/role-management",
    children: [
      {
        path: "/role-management",
        name: "role",
        component: () => import("@/views/role-management/index.vue"),
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "Setting",
        },
      },
    ],
  },
];

//任意路由
export const anyRoute = {
  //任意路由
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  name: "Any",
  meta: {
    title: "任意路由",
    hidden: true,
    icon: "DataLine",
  },
};
