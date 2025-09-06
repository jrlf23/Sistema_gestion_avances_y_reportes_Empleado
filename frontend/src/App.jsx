import React from 'react';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Header_employee from './Componente_comun/Header_employee';
import { Signup_employee } from './Singup_employee/Employee_singup';
import { Login_employee } from './Login_employee/Employee_login';
import ReportExternalFailures from './External_projects/Report_external_failures';
import ReportInternalFailures1 from './Internal_projects _in_the_workshop/Report_internal_failures1';
import ReportInternalFailures2 from './Internal_projects _in_the_workshop/Report_internal_failures2';
import ReportInternalFailures3 from './Internal_projects _in_the_workshop/Report_internal_failures3';
import InternalReportsWizard from './Internal_projects _in_the_workshop/InternalReportsWizard';
import './index.css';

// Layout para empleados
const EmployeeLayout = () => (
  <>
    <Header_employee />
    <Outlet />
  </>
);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Todas las rutas usan EmployeeLayout */}
        <Route element={<EmployeeLayout />}>
          {/* Rutas de empleados */}
          <Route path="/" element={<Login_employee />} />
          <Route path="/Signup_employee" element={<Signup_employee />} />
           <Route
            path="/ReportExternalFailures"
            element={
              <ProtectedRoute>
                <ReportExternalFailures />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ReportInternalFailures"
            element={
              <ProtectedRoute>
                <InternalReportsWizard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
