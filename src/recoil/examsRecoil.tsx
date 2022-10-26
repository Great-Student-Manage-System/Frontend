import { getLocalStorageValue } from "@utility/storage";
import dayjs from "dayjs";
import { atom, selector } from "recoil";

export interface examsTypes {
  examId: number;
  examName: string;
  schoolYear: number;
  subject: string;
}

export interface examsListTypes {
  year: string;
  data: examsTypes[];
}

export const examListAtom = atom<examsListTypes>({
  key: "examList",
  default: {
    year: dayjs().format("YYYY"),
    data: [],
  },
});

const BASE_URL = "https://great.robinjoon.xyz";
const accessToken = getLocalStorageValue("token") ?? "";

export const examSelector = selector({
  key: "getExamList",
  get: async ({ get }) => {
    const exam = await fetch(`${BASE_URL}/api/exams/2022`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => response.json());

    return exam.data;
  },
});
