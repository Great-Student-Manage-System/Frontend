import { loadExamListFetcher } from "@apis/api";
import { getLocalStorageValue } from "@utility/storage";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loginStateAtom } from "@recoil/atom";

export interface examProps {
  examId: number;
  examName: string;
  schoolYear: number;
  subject: string;
  examDate: string;
}

function useExamList(year: string) {
  const accessToken = getLocalStorageValue("token") || "";

  const [result, setResult] = useState<examProps[]>([]);
  const setLoginState = useSetRecoilState(loginStateAtom);
  const { data } = useSWR(
    `/api/exams/${year}`,
    () => loadExamListFetcher(year, accessToken),
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // 404에서 재시도 안함
        if (error.status === 404) return;

        // 10번까지만 재시도함
        if (retryCount >= 10) return undefined;

        // 2초 후에 재시도
        setTimeout(() => revalidate({ retryCount }), 2000);
      },
      onSuccess: () => setLoginState(true),
    },
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
