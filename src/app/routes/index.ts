import { Router } from "express";
import { UserRoute as UserRoutes } from "../module/user/user.route";
import { StudentRoutes } from "../module/student/student.route";
import { academicSemesterRoutes } from "../module/academicSemester/academicsSemester.route";

const router = Router();
const modueRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-semesters",
    route: academicSemesterRoutes,
  },
];

modueRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
