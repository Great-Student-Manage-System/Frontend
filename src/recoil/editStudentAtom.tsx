import { atom } from "recoil";

export interface editStudentInfoProps {
  name: string;
  school: string;
  schoolYear: number;
  subjects: string;
}

export const initialEditStudentInfo = {
  name: "",
  school: "",
  schoolYear: -1,
  subjects: "",
};

export const editStudentAtom = atom({
  key: "editStudentAtom",
  default: { initialEditStudentInfo },
});
