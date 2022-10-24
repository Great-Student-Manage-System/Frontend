import dayjs from "dayjs";
import { atom } from "recoil";

interface examProps {
  examId: string;
  examName: string;
  schoolYear: string;
  subject: string;
}

interface examListProps {
  year: string;
  data: examProps[];
}

export const examListAtom = atom<examListProps>({
  key: "examList",
  default: {
    year: dayjs().format("YYYY"),
    data: [],
  },
});
