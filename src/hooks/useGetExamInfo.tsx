import useSWR from "swr";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorageValue } from "@utility/storage";
import { loadExamInfoFetcher } from "@apis/api";

interface examInfoProps {
  examDate: "string";
  examId: number;
  examName: string;
  gradeCut: number[];
  schoolYear: number;
  subject: string;
}

function useGetExamInfo(examId: number) {
  const accessToken = getLocalStorageValue("token") || "";
  const navigate = useNavigate();
  const [result, setResult] = useState<examInfoProps>();

  const { data } = useSWR(`/api/exam/${examId}`, () =>
    loadExamInfoFetcher(examId, accessToken),
  );

  useEffect(() => {
    if (data && data.code === 200) {
      const { data: examInfo } = data;
      setResult(examInfo);
    } else if (data && data.code >= 400) {
      navigate("/exams");
    } else {
      setResult(undefined);
    }
  }, [data, navigate]);

  return { result };
}

export default useGetExamInfo;
