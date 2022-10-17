import { atom } from "recoil";

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
      name: "김서현",
      school: "경복여고",
      grade: 2,
      subject: "과학",
    },
  ],
});
