import { z } from "zod";
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string(),
  lastName: z.string(),
});
// ✅ Guardian Validation Schema
export const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father name is required"),
  fatherOccupation: z.string().min(1, "Father occupation is required"),
  fatherContactNo: z.string().min(1, "Father contact number is required"),
  motherName: z.string().min(1, "Mother name is required"),
  motherOccupation: z.string().min(1, "Mother occupation is required"),
  motherContactNo: z.string().min(1, "Mother contact number is required"),
});

// ✅ LocalGuardian Validation Schema
export const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian name is required"),
  occupation: z.string().min(1, "Local guardian occupation is required"),
  contactNo: z.string().min(1, "Local guardian contact number is required"),
  address: z.string().min(1, "Local guardian address is required"),
});

// ✅ UserName Validation Schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female"], { message: "Invalid gender" }),
      dateOfBirth: z.string().optional(),
      email: z.string().email("Invalid email format"),
      contactNo: z.string().min(1, "Contact number is required"),
      emergencyContactNo: z
        .string()
        .min(1, "Emergency contact number is required"),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().min(1, "Present address is required"),
      permanentAddress: z.string().min(1, "Permanent address is required"),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});
