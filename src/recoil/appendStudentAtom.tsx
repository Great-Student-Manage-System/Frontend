import { atom } from "recoil";

export interface appendStudentInfoProps {
  name: string;
  school: string;
  schoolYear: number;
  subjects: string;
}

export const initialStudentInfo = {
  name: "",
  school: "",
  schoolYear: -1,
  subjects: "",
};

export const appendStudentAtom = atom<{
  [key: string]: appendStudentInfoProps;
}>({
  key: "appendStudentAtom",
  default: { [Date.now()]: initialStudentInfo },
});
