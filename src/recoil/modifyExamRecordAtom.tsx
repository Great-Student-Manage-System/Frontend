import { atom } from "recoil";

export type stringOrnumber = string | number;

export interface modifyExamRecordInfoProps {
  [key: string]: stringOrnumber;
  //위 항목중 수정하고 싶은 것만 수정
}

export const initialCurExamData = {
  recordId: "",
  examId: 0,
  examScore: 0,
  studentId: "",
};

export const modifyExamRecordAtom = atom<modifyExamRecordInfoProps>({
  key: "modifyExamRecordAtom",
  default: initialCurExamData,
});
