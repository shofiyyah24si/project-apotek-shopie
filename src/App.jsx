import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Layouts - lazy loaded
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

// Main pages - lazy loaded
const Dashboard = React.lazy(() => import("./pages/main/Dashboard"));
const Transactions = React.lazy(() => import("./pages/main/Transactions"));
const Medicines = React.lazy(() => import("./pages/main/Medicines"));
const Patients = React.lazy(() => import("./pages/main/Patients"));
const NotFound = React.lazy(() => import("./pages/main/NotFound"));

// Auth pages - lazy loaded
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

// Loading component
const Loading = React.lazy(() => import("./components/Loading"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

      </Routes>
    </Suspense>
  );
}
