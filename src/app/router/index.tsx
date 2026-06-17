import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../features/auth/pages/LoginPage";
import DashboardPage from "../../features/auth/pages/DashboardPage";
import AdminPanelPage from "../../features/auth/pages/AdminPanelPage";
import ProfilePage from "../../features/users/pages/ProfilePage";
import ProjectsPage from "../../features/projects/pages/ProjectsPage";
import TasksPage from "../../features/tasks/pages/TasksPage";
import AdminTasks from "../../features/auth/pages/AdminTasks";
import DashboardLayout from "../../components/layout/DashboardLayout";

const IndexRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route path="/admin/tasks" element={<AdminTasks />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default IndexRouter;
