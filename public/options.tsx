import { AiOutlineSetting } from "react-icons/ai";
import { MdWifi } from "react-icons/md";
import { VscHome } from "react-icons/vsc";
import { BiCloudDownload } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { FaRegCalendarTimes } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";

export interface Menu {
  option: string;
  icon: JSX.Element;
  path: string;
  sub: {
    name: string;
    path: string;
  }[];
}

export const menu = [
  {
    option: "Home",
    icon: <VscHome />,
    path: "/",
    sub: [
      {
        name: "Dashboard",
        path: "/",
      },
    ],
  },
  {
    option: "Devices",
    icon: <MdWifi />,
    path: "/devices",
    sub: [
      {
        name: "Connections",
        path: "/connections",
      },
    ],
  },
  {
    option: "Employees",
    icon: <FiUsers />,
    path: "/employees",
    sub: [
      {
        name: "Add Employee",
        path: "/add-employee",
      },
      {
        name: "Manage Employees",
        path: "/manage-employees",
      },
    ],
  },
  {
    option: "Leave",
    icon: <FaRegCalendarTimes />,
    path: "/leaves",
    sub: [
      {
        name: "Apply Leave",
        path: "/apply-leave",
      },
      {
        name: "Manage Leaves",
        path: "/manage-leaves",
      },
      {
        name: "Leave Types",
        path: "/leave-types",
      },
    ],
  },
  {
    option: "Attendance",
    icon: <BiCloudDownload />,
    path: "/attendance",
    sub: [
      {
        name: "Fetch Attendance",
        path: "/puller",
      },
      {
        name: "Manual Attendance",
        path: "/manage",
      },
    ],
  },
  {
    option: "Settings",
    icon: <AiOutlineSetting />,
    path: "/settings",
    sub: [
      {
        name: "Company",
        path: "/company",
      },
      {
        name: "Office Hours",
        path: "/hours",
      },
      {
        name: "Manage Departments",
        path: "/departments",
      },
    ],
  },
  {
    option: "Reports",
    icon: <HiOutlineDocumentReport />,
    path: "/reports",
    sub: [
      {
        name: "Attendance",
        path: "/attendance",
      },
    ],
  },
];
