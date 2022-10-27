import { atom } from "recoil";
import { examsTypes } from "@recoil/examsRecoil";

export const currentExamAtom = atom<examsTypes>({
  key: "currentExamAtom",
  default: { examId: 0, examName: "", schoolYear: 0, subject: "" },
});
