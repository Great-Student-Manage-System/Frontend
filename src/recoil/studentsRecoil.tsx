import { atom, selector } from "recoil";
import { getLocalStorageValue } from "@utility/storage";
import { loadStudentListFetcher } from "@apis/api";

export interface studentsTypes {
  studentId: string;
  name: string;
  school: string;
  grade: number;
  subjects: string;
}

export interface studentListTypes {
  maxPage: number;
  data: studentsTypes[];
}

export const studentsAtom = atom<studentListTypes>({
  key: "students",
  default: {
    maxPage: 1,
    data: [],
  },
});

const accessToken = getLocalStorageValue("token") ?? "";

export const studentSelector = selector({
  key: "getStudentList",
  get: async ({ get }) => {
    const student = await loadStudentListFetcher("1", accessToken);
    return student.data;
  },
});
