import dayjs from "dayjs";
import { atom } from "recoil";
import { studentsTypes } from "./studentsAtom";

export const currentStudentAtom = atom<studentsTypes>({
  key: "curentStudent",
  default: { studentId: "", name: "", school: "", grade: 0, subject: "" },
});

interface currentStudentInfoProps {
  year: string;
  subject: string;
}

export const currentStudentInfoAtom = atom<currentStudentInfoProps>({
  key: "curentStudentInfo",
  default: { year: dayjs().format("YYYY"), subject: "" },
});
