import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

const MainLayout     = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout     = React.lazy(() => import("./layouts/AuthLayout"));

const Dashboard      = React.lazy(() => import("./pages/main/Dashboard"));
const Transactions   = React.lazy(() => import("./pages/main/Transactions"));
const Medicines      = React.lazy(() => import("./pages/main/Medicines"));
const MedicineDetail = React.lazy(() => import("./pages/main/MedicineDetail"));
const Patients       = React.lazy(() => import("./pages/main/Patients"));
const PatientDetail  = React.lazy(() => import("./pages/main/PatientDetail"));
const Users          = React.lazy(() => import("./pages/main/Users"));
const NotFound       = React.lazy(() => import("./pages/main/NotFound"));

const Login    = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot   = React.lazy(() => import("./pages/auth/Forgot"));

// ── Proteksi route: redirect ke /login jika belum login ──────
function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// ── Proteksi khusus admin: redirect ke / jika bukan admin ────
function AdminRoute({ children }) {
  const raw = localStorage.getItem("user");
  if (!raw) return <Navigate to="/login" replace />;
  const user = JSON.parse(raw);
  if (user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* Main Layout — semua route dilindungi */}
        <Route element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }>
          <Route path="/"              element={<Dashboard />} />
          <Route path="/transactions"  element={<Transactions />} />
          <Route path="/medicines"     element={<Medicines />} />
          <Route path="/medicines/:id" element={<MedicineDetail />} />
          <Route path="/customers"     element={<Patients />} />
          <Route path="/customers/:id" element={<PatientDetail />} />
          {/* Route khusus admin */}
          <Route path="/users" element={
            <AdminRoute><Users /></AdminRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Auth Layout — public */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>

      </Routes>
    </Suspense>
  );
}
