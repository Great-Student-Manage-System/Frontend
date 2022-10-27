import { loadStudentExamInfoFetcher } from "@apis/api";
import { getLocalStorageValue } from "@utility/storage";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface getStudentExamProps {
  studentId: number;
  name: string;
  school: string;
  grade: number;
  subjects: string;
}

function useGetStudentExam(examId: number) {
  const accessToken = getLocalStorageValue("token") || "";
  const navigate = useNavigate();
  const [result, setResult] = useState<getStudentExamProps[]>([]);

  const { data } = useSWR(`/api/students/exam/${examId}`, () =>
    loadStudentExamInfoFetcher(examId, accessToken),
  ); // 해당 시험을 본 학생 목록 조회

  useEffect(() => {
    if (data && data.code === 200) {
      const { data: studentRecord } = data;
      setResult(studentRecord);
    } else if (data && data.code >= 400) {
      navigate("/exams");
    } else {
      setResult([]);
    }
  }, [data, navigate]);

  return { result };
}

export default useGetStudentExam;
