import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "@pages/Home";
import Students from "@pages/Student/Students";
import StudentDetail from "@pages/Student/StudentDetail";
import Exams from "@pages/Exam/Exams";
import ExamDetail from "@pages/Exam/ExamDetail";
import Mypage from "@pages/Mypage";
import Login from "@pages/Auth/Login";
import Signup from "@pages/Auth/Signup";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "@recoil/accessTokenAtom";

function URLRoutes() {
  const accessToken = useRecoilValue(accessTokenAtom);

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
