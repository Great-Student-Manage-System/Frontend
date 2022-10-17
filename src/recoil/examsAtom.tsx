import { atom } from "recoil";

export interface examsTypes {
  examId: number;
  examName: string;
  schoolYear: number;
  subject: string;
}

export const examsAtom = atom<examsTypes[]>({
  key: "exams",

  default: [
    {
      examId: 23141,
      examName: "6평",
      schoolYear: 1, // 학년
      subject: "사회",
    },
    {
      examId: 23145,
      examName: "9평",
      schoolYear: 1, // 학년
      subject: "화학",
    },
  ],
});
