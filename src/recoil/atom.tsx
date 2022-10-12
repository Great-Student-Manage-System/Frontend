import { atom } from "recoil";

export interface signUpConditionProps {
  email: false;
  password: false;
  nickName: false;
  subject: false;
}

export const signUpConditionAtom = atom<signUpConditionProps>({
  key: "signUpCondition",
  default: { email: false, password: false, nickName: false, subject: false },
});

//학생 목록
export interface studentsTypes {
  studentId: string;
  name: string;
  school: string;
  grade: number;
  subject: string;
}

export const studentsAtom = atom<studentsTypes[]>({
  key: "students",

  default: [
    {
      studentId: "dmstn111",
      name: "이은수",
      school: "경복여고",
      grade: 3,
      subject: "과학",
    },
    {
      studentId: "dmstn112",
      name: "김가영",
      school: "경복여고",
      grade: 2,
      subject: "과학",
    },
    {
      studentId: "dmstn113",
      name: "손지연",
      school: "경복여고",
      grade: 2,
      subject: "과학",
    },
  ],
});

//시험 목록
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
