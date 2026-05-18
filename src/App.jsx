import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

const MainLayout   = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout   = React.lazy(() => import("./layouts/AuthLayout"));

const Dashboard    = React.lazy(() => import("./pages/main/Dashboard"));
const Transactions = React.lazy(() => import("./pages/main/Transactions"));
const Medicines    = React.lazy(() => import("./pages/main/Medicines"));
const MedicineDetail = React.lazy(() => import("./pages/main/MedicineDetail"));
const Patients     = React.lazy(() => import("./pages/main/Patients"));
const PatientDetail  = React.lazy(() => import("./pages/main/PatientDetail"));
const NotFound     = React.lazy(() => import("./pages/main/NotFound"));
const UIComponents = React.lazy(() => import("./pages/UIComponents"));


const Login    = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot   = React.lazy(() => import("./pages/auth/Forgot"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/"               element={<Dashboard />} />
          <Route path="/transactions"   element={<Transactions />} />
          <Route path="/medicines"      element={<Medicines />} />
          <Route path="/medicines/:id"  element={<MedicineDetail />} />
          <Route path="/patients"       element={<Patients />} />
          <Route path="/patients/:id"   element={<PatientDetail />} />
          <Route path="/ui-components"  element={<UIComponents />} />
          <Route path="*"               element={<NotFound />} />

        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>

      </Routes>
    </Suspense>
  );
}