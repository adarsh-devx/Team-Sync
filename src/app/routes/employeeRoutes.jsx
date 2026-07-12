import MyTask from "../../features/employee module/MyTask/ui/pages/MyTask";
import Attendance from "../../features/employee module/attendance/ui/pages/Attendance";
import Profile from "../../features/employee module/profile/ui/pages/Profile";

export let employeeRoutes = [
    {
        path: '/home/myTask' ,
        element: <MyTask />
    },
    {
        path: '/home/attendance' ,
        element: <Attendance />
    },
    {
        path: '/home/profile' ,
        element: <Profile />
    },


]