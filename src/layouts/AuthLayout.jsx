import { Outlet } from "react-router-dom";
import { MdMedicalServices } from "react-icons/md";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-50">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="bg-teal-600 p-2 rounded-xl">
                        <MdMedicalServices className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl font-poppins font-extrabold text-gray-800">
                        <span className="text-teal-600">Farma</span>
                        <span className="text-gray-800">Care</span>
                        <span className="text-teal-600">+</span>
                    </h1>
                </div>

                <Outlet />

                <p className="text-center text-xs text-gray-400 mt-6">
                    &copy; 2026 FarmaCare+ Sistem Manajemen Apotek. All rights reserved.
                </p>
            </div>
        </div>
    );
}
