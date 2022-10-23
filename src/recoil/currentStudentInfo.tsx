import { atom } from "recoil";
import { studentsTypes } from "./studentsAtom";

export const currentStudentAtom = atom<studentsTypes>({
  key: "curentStudent",
  default: { studentId: "", name: "", school: "", grade: 0, subject: "" },
});
