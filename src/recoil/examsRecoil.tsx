import { loadExamListFetcher } from "@apis/api";
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

const CUR_YEAR = dayjs().format("YYYY");

export const examListAtom = atom<examsListTypes>({
  key: "examList",
  default: {
    year: CUR_YEAR,
    data: [],
  },
});

const accessToken = getLocalStorageValue("token") ?? "";

export const examSelector = selector({
  key: "getExamList",
  get: async ({ get }) => {
    const exam = await loadExamListFetcher(CUR_YEAR, accessToken);
    return exam.data;
  },
});
