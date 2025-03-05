import {
  AddLinkRound,
  CodeRound,
  CommentRound,
  EmailRound,
  FileUploadRound,
  MenuRound,
  MonitorRound,
  PostAddTwotone,
  QueryStatsRound,
  SpaceDashboardRound,
  TagRound,
  TaskRound,
  VerifiedUserRound
} from "@vicons/material";
import { type RouteRecordRaw } from "vue-router";

export const AdminRoute: RouteRecordRaw = {
  path: "/admin",
  name: "admin",
  meta: {
    title: "轻管理"
  },
  redirect(_to) {
    return {
      name: "dash"
    };
  },
  component: () => import("@/admin"),

  children: [
    // 控制台
    {
      path: "dash",
      name: "dash",
      meta: {
        title: "控制台",
        displayName: "控制台",
        routeIcon: () => <SpaceDashboardRound />
      },
      component: () => import("@/admin/views/dash")
    },

    // 文章管理
    {
      path: "post",
      name: "post",
      redirect: () => {
        return {
          name: "post-list"
        };
      },
      meta: {
        title: "文章管理",
        displayName: "文章管理",
        routeIcon: () => <PostAddTwotone />
      },
      children: [
        {
          path: "post-list",
          name: "post-list",
          meta: {
            title: "文章列表",
            displayName: "文章列表"
          },
          component: () => import("@/admin/views/post-manager/post-list")
        },
        {
          path: "edit",
          name: "edit-post",
          meta: {
            title: "添加/编辑 文章",
            displayName: "编辑文章"
          },
          component: () => import("@/admin/views/post-manager/post-editor")
        }
      ]
    },

    // 标签管理
    {
      path: "post-tag",
      name: "post-tag",
      component: () => import("@/admin/views/tag"),
      meta: {
        title: "标签管理",
        displayName: "标签管理",
        routeIcon: () => <TagRound />
      }
    },

    // 评论管理
    {
      path: "post-comment",
      name: "post-comment",
      meta: {
        title: "评论管理",
        displayName: "评论管理",
        routeIcon: () => <CommentRound />
      },
      component: () => import("@/admin/views/comment")
    },

    // 用户管理
    {
      path: "user",
      name: "user",
      meta: {
        title: "用户管理",
        displayName: "用户管理",
        routeIcon: () => <VerifiedUserRound />
      },
      redirect: () => {
        return {
          name: "login-sessions"
        };
      },
      children: [
        {
          path: "login-sessions",
          name: "login-sessions",
          component: () => import("@/admin/views/user/session-list"),
          meta: {
            title: "登录会话",
            displayName: "登录会话"
          }
        },
        {
          path: "user-list",
          name: "user-list",
          component: () => import("@/admin/views/user/user-list"),
          meta: {
            title: "用户列表",
            displayName: "用户列表"
          }
        }
      ]
    },

    // 菜单管理
    {
      path: "menu",
      name: "menu",
      meta: {
        title: "菜单管理",
        displayName: "菜单管理",
        routeIcon: () => <MenuRound />
      },
      component: () => import("@/admin/views/menus")
    },

    // 文件管理
    {
      path: "file",
      name: "file",
      meta: {
        title: "文件管理",
        displayName: "文件管理",
        routeIcon: () => <FileUploadRound />
      },
      redirect: () => {
        return {
          name: "local-file"
        };
      },

      children: [
        {
          path: "local-file",
          name: "local-file",
          component: () => import("@/admin/views/file/local"),
          meta: {
            title: "本地文件",
            displayName: "本地文件"
          }
        },
        {
          path: "s3-file",
          name: "s3-file",
          component: () => import("@/admin/views/file/s3"),
          meta: {
            title: "s3 文件",
            displayName: "s3 文件"
          }
        }
      ]
    },

    // 评论管理
    {
      path: "friend",
      name: "friend",
      component: () => import("@/admin/views/friend-link"),
      meta: {
        title: "友链管理",
        displayName: "友链管理",
        routeIcon: () => <AddLinkRound />
      }
    },

    // 访问管理
    {
      path: "uv-statistics",
      name: "uv-statistics",
      component: () => import("@/admin/views/uv-statistic"),
      meta: {
        title: "访问统计",
        displayName: "访问统计",
        routeIcon: () => <QueryStatsRound />
      }
    },

    // IP 管理
    {
      path: "ip",
      name: "ip",
      redirect(_to) {
        return {
          name: "limit-list"
        };
      },
      meta: {
        title: "IP 管理",
        displayName: "IP 管理",
        routeIcon: () => <QueryStatsRound />
      },
      children: [
        {
          path: "limit-list",
          name: "limit-list",
          component: () => import("@/admin/views/ip-manager/limit-log"),
          meta: {
            displayName: "限流记录",
            title: "IP 限流记录"
          }
        },
        {
          path: "ip-blocks",
          name: "ip-blocks",
          component: () => import("@/admin/views/ip-manager/block-list"),
          meta: {
            displayName: "黑名单列表",
            title: "IP 黑名单列表"
          }
        }
      ]
    },

    // 邮件管理
    {
      path: "email",
      name: "email",
      redirect() {
        return {
          name: "registered-emails"
        };
      },
      meta: {
        title: "邮件管理",
        displayName: "邮件管理",
        routeIcon: () => <EmailRound />
      },
      children: [
        {
          name: "registered-emails",
          path: "registered-emails",
          component: () => import("@/admin/views/email/registered"),
          meta: {
            title: "已添加邮箱列表",
            displayName: "已添加邮箱"
          }
        },
        {
          name: "edit-email",
          path: "edit-email",
          component: () => import("@/admin/views/email/editor"),
          meta: {
            title: "写邮件",
            displayName: "添加邮件"
          }
        }
      ]
    },

    // 系统资源监控
    {
      path: "monitor",
      name: "monitor",
      component: () => import("@/admin/views/monitor"),
      meta: {
        title: "系统资源",
        displayName: "系统资源",
        routeIcon: () => <MonitorRound />
      }
    },

    // 定时任务管理
    {
      path: "timing-task",
      name: "timing-task",
      redirect() {
        return {
          name: "presets-tasks"
        };
      },
      meta: {
        title: "定时任务",
        displayName: "定时任务",
        routeIcon: () => <TaskRound />
      },
      children: [
        {
          path: "presets-tasks",
          name: "presets-tasks",
          component: () => import("@/admin/views/task/presets"),
          meta: {
            title: "任务预设列表",
            displayName: "任务预设列表"
          }
        },
        {
          path: "registered-tasks",
          name: "registered-tasks",
          component: () => import("@/admin/views/task/registered"),
          meta: {
            title: "已添加任务",
            displayName: "已添加任务"
          }
        }
      ]
    },

    // 日志管理
    {
      path: "log-manager",
      name: "log-manager",
      component: () => import("@/admin/views/log-manager"),
      meta: {
        title: "日志管理",
        displayName: "日志管理",
        routeIcon: () => <CodeRound />
      }
    }
  ]
};
