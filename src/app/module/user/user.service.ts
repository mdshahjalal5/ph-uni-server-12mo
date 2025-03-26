import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createUserIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_pass;
  userData.role = "student";
  //find academic semester info

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error("Invalid admission semester ID");
  }

  userData.id = await generateStudentId(admissionSemester);
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    payload.user = newUser._id;
    payload.id = newUser.id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserService = {
  createUserIntoDB,
};
