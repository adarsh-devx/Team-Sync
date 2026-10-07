import {
  Building2,
  ClipboardList,
  File,
  LayoutDashboard,
  MessageCircle,
  Presentation,
  Settings,
  User,
  UserCircle2,
} from "lucide-react";

export let employeeNavigation = [
  {
    path: "/home",
    title: "Dashboard",
    Icon: <LayoutDashboard />,
  },
  {
    path: "/home/myTask",
    title: "My Task",
    Icon: <ClipboardList />,
  },
  {
    path: "/home/chat",
    title: "Chats",
    Icon: <MessageCircle />,
  },
  {
    path: "/home/attendance",
    title: "Attendance",
    Icon: <Presentation />,
  },
  {
    path: "/home/profile",
    title: "Profile",
    Icon: <UserCircle2 />,
  },
  {
    path: "/home/setting",
    title: "Settings",
    Icon: <Settings />,
  },
];

export let adminNavigation = [
  {
    path: "/home",
    title: "Dashboard",
    Icon: <LayoutDashboard />,
  },
  {
    path: "/home/task",
    title: "Task",
    Icon: <ClipboardList />,
  },
  {
    path: "/home/chat",
    title: "Chats",
    Icon: <MessageCircle />,
  },
  {
    path: "/home/department",
    title: "Departments",
    Icon: <Building2 />,
  },
  {
    path: "/home/employee",
    title: "Team",
    Icon: <User />,
  },
  {
    path: "/home/document",
    title: "Documents",
    Icon: <File />,
  },
  {
    path: "/home/setting",
    title: "Settings",
    Icon: <Settings />,
  },
];
