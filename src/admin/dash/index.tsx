import { NLayout, NLayoutFooter, NLayoutHeader, NLayoutSider, NMenu } from "naive-ui";

import {
  AddRound,
  CheckRound,
  CloudRound,
  CodeRound,
  CommentBankTwotone,
  DesktopMacRound,
  EmailRound,
  FilePresentRound,
  LinkRound,
  MenuBookRound,
  MonitorHeartRound,
  NetworkWifiRound,
  PostAddTwotone,
  QueryStatsRound,
  SentimentSatisfiedTwotone,
  SpaceDashboardRound,
  TagRound,
  TaskRound,
  VerifiedUserRound
} from "@vicons/material";
import type { MenuMixedOption } from "naive-ui/es/menu/src/interface";
import { defineComponent } from "vue";
export const AdminDashboard = defineComponent({
  name: "AdminDashboard",
  setup() {
    const menuOptions: MenuMixedOption[] = [
      {
        label: "控制台",
        key: "dashboard",
        icon: () => <SpaceDashboardRound />
      },
      {
        label: "文章管理",
        key: "post",
        icon: () => <PostAddTwotone />,
        children: [
          {
            label: "文章列表",
            key: "post-list"
          },
          {
            label: "添加文章",
            key: "add-post"
          }
        ]
      },
      {
        label: "标签管理",
        key: "tags",
        icon: () => <TagRound />
      },
      {
        label: "评论管理",
        key: "comment",
        icon: () => <CommentBankTwotone />
      },
      {
        label: "用户管理",
        key: "user",
        icon: () => <VerifiedUserRound />,
        children: [
          {
            label: "登录会话",
            key: "login-sessions"
          },
          {
            label: "用户操作",
            key: "user-detail"
          }
        ]
      },
      {
        label: "菜单管理",
        key: "menu",
        icon: () => <MenuBookRound />
      },
      {
        label: "文件管理",
        key: "file",
        icon: () => <FilePresentRound />,
        children: [
          {
            label: "本地文件",
            key: "local-file",
            icon: () => <DesktopMacRound />
          },
          {
            label: "S3 文件",
            key: "s3-file",
            icon: () => <CloudRound />
          }
        ]
      },
      {
        label: "友链管理",
        key: "friend-link",
        icon: () => <LinkRound />
      },
      {
        label: "独立访问用户",
        key: "uv",
        icon: () => <QueryStatsRound />
      },
      {
        label: "IP 管理",
        key: "ip",
        icon: () => <NetworkWifiRound />
      },
      {
        label: "邮件管理",
        key: "email",
        icon: () => <EmailRound />,
        children: [
          {
            label: "已注册",
            key: "email-list",
            icon: () => <CheckRound />
          },
          {
            label: "写邮件",
            key: "write-email",
            icon: () => <AddRound />
          }
        ]
      },
      {
        label: "系统监控",
        key: "monitor",
        icon: () => <MonitorHeartRound />
      },
      {
        label: "定时任务",
        key: "timing-task",
        icon: () => <TaskRound />,
        children: [
          {
            label: "已注册",
            key: "registered-task"
          },
          {
            label: "状态",
            key: "task-status"
          }
        ]
      },
      {
        label: "日志管理",
        key: "logs",
        icon: () => <CodeRound />,
        children: [
          {
            label: "浏览",
            key: "log-visit"
          },
          {
            label: "导出",
            key: "log-export"
          }
        ]
      }
    ];

    return () => (
      <NLayout class={`w-full h-full bg-transparent`}>
        <NLayoutHeader class={`h-[45px]`}>SHALLING ADMIN</NLayoutHeader>
        <NLayout hasSider={true} class={`h-[calc(100%-100px)]`} siderPlacement={"left"}>
          <NLayoutSider
            nativeScrollbar={false}
            bordered={true}
            showTrigger={false}
            collapseMode={"width"}
            collapsedWidth={50}
            width={240}
            inverted={true}
          >
            <NMenu
              defaultValue={"local-file"}
              inverted={true}
              collapsedWidth={50}
              collapsedIconSize={22}
              options={menuOptions}
              class={`select-none`}
              onUpdateValue={(val) => {
                console.log(val);
              }}
            />
          </NLayoutSider>
        </NLayout>
        <NLayoutFooter class={`h-[55px]`}>Footer</NLayoutFooter>
      </NLayout>
    );
  }
});

export default AdminDashboard;
