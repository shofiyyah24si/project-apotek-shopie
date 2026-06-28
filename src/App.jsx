import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

const MainLayout     = React.lazy(() => import("./layouts/MainLayout"));
const MemberLayout   = React.lazy(() => import("./layouts/MemberLayout"));
const AuthLayout     = React.lazy(() => import("./layouts/AuthLayout"));

const Dashboard      = React.lazy(() => import("./pages/main/Dashboard"));
const Transactions   = React.lazy(() => import("./pages/main/Transactions"));
const Medicines      = React.lazy(() => import("./pages/main/Medicines"));
const MedicineDetail = React.lazy(() => import("./pages/main/MedicineDetail"));
const Patients       = React.lazy(() => import("./pages/main/Patients"));
const PatientDetail  = React.lazy(() => import("./pages/main/PatientDetail"));
const Users          = React.lazy(() => import("./pages/main/Users"));
const NotFound       = React.lazy(() => import("./pages/main/NotFound"));

// Halaman member
const DashboardMember  = React.lazy(() => import("./pages/member/DashboardMember"));
const KatalogObat      = React.lazy(() => import("./pages/member/KatalogObat"));
const RiwayatTransaksi = React.lazy(() => import("./pages/member/RiwayatTransaksi"));
const KomplainFeedback = React.lazy(() => import("./pages/member/KomplainFeedback"));

const Login    = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot   = React.lazy(() => import("./pages/auth/Forgot"));
const LandingPage = React.lazy(() => import("./pages/landing/LandingPage"));

// Proteksi: redirect ke /login jika belum login
function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Proteksi khusus admin
function AdminRoute({ children }) {
  const raw = localStorage.getItem("user");
  if (!raw) return <Navigate to="/login" replace />;
  const user = JSON.parse(raw);
  // Kalau bukan admin, arahkan ke halaman member bukan ke /
  if (user.role !== "admin") return <Navigate to="/member" replace />;
  return children;
}

// Proteksi khusus member (role user)
function MemberRoute({ children }) {
  const raw = localStorage.getItem("user");
  // Belum login → ke halaman login
  if (!raw) return <Navigate to="/login" replace />;
  const user = JSON.parse(raw);
  // Kalau admin coba akses /member → ke dashboard admin
  if (user.role === "admin") return <Navigate to="/" replace />;
  return children;
}

// Redirect root berdasarkan role
function RootRedirect() {
  const raw = localStorage.getItem("user");
  if (!raw) return <Navigate to="/home" replace />;
  const user = JSON.parse(raw);
  if (user.role === "admin") return <Navigate to="/dashboard" replace />;
  return <Navigate to="/member" replace />;
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* Admin Layout */}
        <Route element={<AdminRoute><MainLayout /></AdminRoute>}>
          <Route path="/dashboard"     element={<Dashboard />} />
          <Route path="/transactions"  element={<Transactions />} />
          <Route path="/medicines"     element={<Medicines />} />
          <Route path="/medicines/:id" element={<MedicineDetail />} />
          <Route path="/customers"     element={<Patients />} />
          <Route path="/customers/:id" element={<PatientDetail />} />
          <Route path="/users"         element={<Users />} />
          <Route path="*"              element={<NotFound />} />
        </Route>

        {/* Root — redirect sesuai role */}
        <Route path="/" element={<RootRedirect />} />

        {/* Member Layout */}
        <Route element={<MemberRoute><MemberLayout /></MemberRoute>}>
          <Route path="/member"          element={<DashboardMember />} />
          <Route path="/member/katalog"  element={<KatalogObat />} />
          <Route path="/member/riwayat"  element={<RiwayatTransaksi />} />
          <Route path="/member/komplain" element={<KomplainFeedback />} />
        </Route>

        {/* Auth Layout — public */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>

        {/* Landing Page — public */}
        <Route path="/home" element={<LandingPage />} />

      </Routes>
    </Suspense>
  );
}
