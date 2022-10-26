import { atom, selector } from "recoil";
import { getLocalStorageValue } from "@utility/storage";

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

const BASE_URL = "https://great.robinjoon.xyz";
const accessToken = getLocalStorageValue("token") ?? "";

export const studentSelector = selector({
  key: "getStudentList",
  get: async ({ get }) => {
    const student = await fetch(`${BASE_URL}/api/students/1`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => response.json());

    return student.data;
  },
});
