import dayjs from "dayjs";
import { atom } from "recoil";
import { studentsTypes } from "./studentsRecoil";

export const currentStudentAtom = atom<studentsTypes>({
  key: "curentStudent",
  default: { studentId: "", name: "", school: "", grade: 0, subjects: "" },
});

interface currentStudentInfoProps {
  year: string;
  subject: string;
}

export const currentStudentInfoAtom = atom<currentStudentInfoProps>({
  key: "curentStudentInfo",
  default: { year: dayjs().format("YYYY"), subject: "" },
});
