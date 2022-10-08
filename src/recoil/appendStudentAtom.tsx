import { atom } from "recoil";

export interface appendStudentInfoProps {
  email: string;
  school: string;
  grade: number;
  subjects: string;
}

export const initialStudentInfo = {
  email: "",
  school: "",
  grade: -1,
  subjects: "",
};

export const appendStudentAtom = atom<{
  [key: string]: appendStudentInfoProps;
}>({
  key: "appendStudentAtom",
  default: { 0: initialStudentInfo },
});
