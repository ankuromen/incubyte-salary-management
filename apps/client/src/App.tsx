import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";
import { AddEmployeePage } from "./pages/AddEmployeePage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EditEmployeePage } from "./pages/EditEmployeePage";
import { EmployeeListPage } from "./pages/EmployeeListPage";
import { LoginPage } from "./pages/LoginPage";
import { ManageAdminsPage } from "./pages/ManageAdminsPage";

const App = () => (
  <Routes>
    <Route element={<LoginPage />} path="/login" />
    <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route element={<EmployeeListPage />} path="employees" />
        <Route element={<AddEmployeePage />} path="employees/new" />
        <Route element={<EditEmployeePage />} path="employees/:id/edit" />
        <Route element={<AnalyticsPage />} path="analytics" />
        <Route element={<ManageAdminsPage />} path="admins" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Route>
    </Route>
    <Route element={<Navigate replace to="/login" />} path="*" />
  </Routes>
);

export default App;
