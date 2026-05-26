import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AddEmployeePage } from "./pages/AddEmployeePage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EditEmployeePage } from "./pages/EditEmployeePage";
import { EmployeeListPage } from "./pages/EmployeeListPage";

const App = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route index element={<DashboardPage />} />
      <Route element={<EmployeeListPage />} path="employees" />
      <Route element={<AddEmployeePage />} path="employees/new" />
      <Route element={<EditEmployeePage />} path="employees/:id/edit" />
      <Route element={<AnalyticsPage />} path="analytics" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Route>
  </Routes>
);

export default App;
