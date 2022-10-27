import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "@pages/Home";
import Students from "@pages/Student/Students";
import StudentDetail from "@pages/Student/StudentDetail";
import Exams from "@pages/Exam/Exams";
import ExamDetail from "@pages/Exam/ExamDetail";
import Login from "@pages/Auth/Login";
import Signup from "@pages/Auth/Signup";
import { getLocalStorageValue } from "@utility/storage";
import Account from "@pages/Mypage/Account";
import Profile from "@pages/Mypage/Profile";

function URLRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/students"
          element={
            getLocalStorageValue("token") ? (
              <Students />
            ) : (
              <Navigate replace to={"/auth/login"} />
            )
          }
        />
        <Route
          path="/students/:id"
          element={
            getLocalStorageValue("token") ? (
              <StudentDetail />
            ) : (
              <Navigate replace to={"/auth/login"} />
            )
          }
        />
        <Route
          path="/exams"
          element={
            getLocalStorageValue("token") ? (
              <Exams />
            ) : (
              <Navigate replace to={"/auth/login"} />
            )
          }
        />
        <Route
          path="/exams/:id"
          element={
            getLocalStorageValue("token") ? (
              <ExamDetail />
            ) : (
              <Navigate replace to={"/auth/login"} />
            )
          }
        />
        <Route
          path="/mypage/account"
          element={
            getLocalStorageValue("token") ? (
              <Account />
            ) : (
              <Navigate replace to={"/auth/login"} />
            )
          }
        />
        <Route
          path="/mypage/profile"
          element={
            getLocalStorageValue("token") ? (
              <Profile />
            ) : (
              <Navigate replace to={"/auth/login"} />
            )
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
