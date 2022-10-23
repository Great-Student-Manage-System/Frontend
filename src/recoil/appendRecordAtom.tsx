import { atom } from "recoil";

export interface appendRecordInfoProps {
  studentID: string;
  examId: string;
  subject: string;
  examResult: number;
}

export const initialRecordInfo = {
  studentID: "",
  examId: "",
  subject: "",
  examResult: 0,
};

export const appendRecordAtom = atom<{
  [key: string]: appendRecordInfoProps;
}>({
  key: "appendRecordtAtom",
  default: {},
});
