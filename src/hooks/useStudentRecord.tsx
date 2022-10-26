import { loadStudentDetailFetcher, studentDetailProps } from "@apis/api";
import { getLocalStorageValue } from "@utility/storage";
import useSWR from "swr";
import { useState, useEffect } from "react";

function useStudentRecord({ studentId, subject, year }: studentDetailProps) {
  const accessToken = getLocalStorageValue("token") || "";
  const obj = { studentId, subject, year, accessToken };
  const [result, setResult] = useState([]);

  const { data } = useSWR(`/api/students/${studentId}/${subject}/${year}`, () =>
    loadStudentDetailFetcher(obj),
  );

  useEffect(() => {
    if (data && data.code === 200) {
      const { data: studentRecord } = data;
      setResult(studentRecord);
    } else {
      setResult([]);
    }
  }, [data]);

  return result;
}

export default useStudentRecord;
