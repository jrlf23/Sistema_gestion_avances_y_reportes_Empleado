import React from 'react';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Header_employee from './Componente_comun/Header_employee';
import { Signup_employee } from './Singup_employee/Employee_singup';
import { Login_employee } from './Login_employee/Employee_login';
import ReportExternalFailures from './External_projects/Report_external_failures';
import InternalReportsWizard from './Internal_projects _in_the_workshop/InternalReportsWizard';
import './index.css';
import Header_employee2 from './Componente_comun/Header_employee2';
import Lobby from './Lobby/Lobby';

// Layout para empleados
const EmployeeLayout = () => (
  <>
    <Header_employee />
    <Outlet />
  </>
);

const AuthLayout = () =>
(
  <>
  <Header_employee2/>
  <Outlet/>
  </>
)

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login_employee />} />
          <Route path="/Signup_employee" element={<Signup_employee />} />
        </Route>

        {/* Todas las rutas usan EmployeeLayout */}
        <Route element={<EmployeeLayout />}>
          {/* Rutas de empleados */}
            <Route path='/lobby' element={<ProtectedRoute> <Lobby/> </ProtectedRoute>}/>
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
