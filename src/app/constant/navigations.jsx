import {
  Building,
  ChartArea,
  File,
  LayoutDashboard,
  List,
  PersonStanding,
  Presentation,
  Send,
  Settings,
} from "lucide-react";
import { Profiler } from "react";

export let employeeNavigation = [
  {
    path: "/home",
    title: "Dashboard",
    Icon: <LayoutDashboard />,
  },
  {
    path: "/home/myTask",
    title: "My Task",
    Icon: <List />,
  },
  {
    path: "/home/chat",
    title: "Chats",
    Icon: <ChartArea />,
  },
  {
    path: "/home/attendance",
    title: "Attendance",
    Icon: <Presentation />,
  },
  {
    path: "/home/profile",
    title: "Profile",
    Icon: <Profiler />,
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
    Icon: <List />,
  },
  {
    path: "/home/chat",
    title: "Chats",
    Icon: <ChartArea />,
  },
  {
    path: "/home/department",
    title: "Departments",
    Icon: <Building />,
  },
  {
    path: "/home/employee",
    title: "Employee",
    Icon: <PersonStanding />,
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
