import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../../features/auth/pages/LoginPage";
import AdminPanelPage from "../../features/auth/pages/AdminPanelPage";
import ProfilePage from "../../features/users/pages/ProfilePage";
import UsersPage from "../../features/users/pages/UsersPage";
import ProjectsPage from "../../features/projects/pages/ProjectsPage";
import TasksPage from "../../features/tasks/pages/TasksPage";
import AdminTasks from "../../features/auth/pages/AdminTasks";
import DashboardLayout from "../../components/layout/DashboardLayout";
import RegisterPage from "../../features/auth/pages/Register";
import ForgetPassword from "../../features/auth/pages/ForgetPassword";
import ResetPassword from "../../features/auth/pages/ResetPassword";
import ChangePassword from "../../features/auth/pages/ChangePassword";
import VerifyAccount from "@/features/auth/pages/VerifyAccount";
import AddProjectPage from "@/features/projects/pages/AddProjects";
import HomePage from "@/features/home/pages/HomePage";

const IndexRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/Reset-password" element={<ResetPassword />} />
        <Route path="/Change-password" element={<ChangePassword />} />
        <Route path="/Verify-account" element={<VerifyAccount />} />

        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route path="/admin/tasks" element={<AdminTasks />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/add-project" element={<AddProjectPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default IndexRouter;
