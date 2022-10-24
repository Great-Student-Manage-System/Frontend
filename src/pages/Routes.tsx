import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "@pages/Home";
import Students from "@pages/Student/Students";
import StudentDetail from "@pages/Student/StudentDetail";
import Exams from "@pages/Exam/Exams";
import ExamDetail from "@pages/Exam/ExamDetail";
import Mypage from "@pages/Mypage";
import Login from "@pages/Auth/Login";
import Signup from "@pages/Auth/Signup";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenAtom } from "@recoil/accessTokenAtom";
import { useEffect } from "react";
import { myInfoAtom } from "@recoil/myInfoatom";
import { DETAIL_SUBJECTS, MAIN_SUBJECTS } from "@data/subjectData";
import useMyInfo from "@hooks/useMyInfo";
import { getLocalStorageValue } from "@utility/storage";

function URLRoutes() {
  const stateToken = useRecoilValue(accessTokenAtom);
  const accessToken = getLocalStorageValue("token") ?? stateToken;

  const { myInfo } = useMyInfo();
  const setMyInfo = useSetRecoilState(myInfoAtom);

  useEffect(() => {
    if (myInfo?.code === 200) {
      const { data } = myInfo;
      setMyInfo({
        ...data,
        subSubjects:
          DETAIL_SUBJECTS[data.subject as keyof typeof MAIN_SUBJECTS],
      });
    }
  }, [myInfo, setMyInfo]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/students"
          element={
            accessToken ? <Students /> : <Navigate replace to={"/auth/login"} />
          }
        />
        <Route
          path="/students/:id"
          element={
            accessToken ? (
              <StudentDetail />
            ) : (
              <Navigate replace to={"/auth/login"} />
            )
          }
        />
        <Route
          path="/exams"
          element={
            accessToken ? <Exams /> : <Navigate replace to={"/auth/login"} />
          }
        />
        <Route
          path="/exams/:id"
          element={
            accessToken ? (
              <ExamDetail />
            ) : (
              <Navigate replace to={"/auth/login"} />
            )
          }
        />
        <Route
          path="/mypage"
          element={
            accessToken ? <Mypage /> : <Navigate replace to={"/auth/login"} />
          }
        />

        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default URLRoutes;
