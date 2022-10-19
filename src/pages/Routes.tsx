import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Students from "@pages/Student/Students";
import StudentDetail from "@pages/Student/StudentDetail";
import Exams from "@pages/Exam/Exams";
import ExamDetail from "@pages/Exam/ExamDetail";
import Login from "@pages/Auth/Login";
import Signup from "@pages/Auth/Signup";
import Account from "@pages/Mypage/Account";
import Profile from "@pages/Mypage/Profile";

function URLRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/exams" element={<Exams />}>
          <Route path="/exams/:id" element={<ExamDetail />} />
        </Route>
        <Route path="/mypage/account" element={<Account />} />
        <Route path="/mypage/profile" element={<Profile />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default URLRoutes;
