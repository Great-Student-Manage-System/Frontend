import { loadStudentListFetcher } from "@apis/api";
import { studentListTypes, studentsTypes } from "@recoil/studentsRecoil";
import { getLocalStorageValue } from "@utility/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

function useStudentList(page: string) {
  const accessToken = getLocalStorageValue("token") || "";
  const navigate = useNavigate();

  const [result, setResult] = useState<studentListTypes>({
    maxPage: 0,
    data: [],
  });

  const { data } = useSWR(
    `/api/students/${page}`,
    () => loadStudentListFetcher(page, accessToken),
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // 404에서 재시도 안함
        if (error.status === 404) return;

        // 10번까지만 재시도함
        if (retryCount >= 5) return undefined;

        // 2초 후에 재시도
        setTimeout(() => revalidate({ retryCount }), 2000);
      },
    },
  );

  useEffect(() => {
    if (data && data.code === 200) {
      const { data: studentRecord } = data;
      setResult(studentRecord);
    } else {
      setResult({
        maxPage: 0,
        data: [],
      });
    }
  }, [data, navigate]);

  return { result };
}

export default useStudentList;
