import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "@pages/Home";
import Students from "@pages/Student/Students";
import StudentDetail from "@pages/Student/StudentDetail";
import Exams from "@pages/Exam/Exams";
import ExamDetail from "@pages/Exam/ExamDetail";
import Mypage from "@pages/Mypage";
import Login from "@pages/Auth/Login";
import Signup from "@pages/Auth/Signup";

function URLRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/exams/:id" element={<ExamDetail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default URLRoutes;
