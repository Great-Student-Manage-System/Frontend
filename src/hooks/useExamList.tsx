import { loadExamListFetcher } from "@apis/api";
import { getLocalStorageValue } from "@utility/storage";
import useSWR from "swr";
import { useState, useEffect } from "react";

export interface examProps {
  examId: number;
  examName: string;
  schoolYear: number;
  subject: string;
}

function useExamList(year: string) {
  const accessToken = getLocalStorageValue("token") || "";

  const [result, setResult] = useState<examProps[]>([]);

  const { data } = useSWR(`/api/exams/${year}`, () =>
    loadExamListFetcher(year, accessToken),
  );

  useEffect(() => {
    if (data && data.code === 200) {
      const { data: examList } = data;
      setResult(examList.data);
    } else {
      setResult([]);
    }
  }, [data]);

  return { result };
}

export default useExamList;
