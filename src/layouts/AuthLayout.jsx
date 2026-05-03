import { Outlet } from "react-router-dom";
import { MdMedicalServices } from "react-icons/md";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex bg-gradient-to-br from-teal-600 to-teal-800">

            {/* Left panel - branding */}
            <div className="hidden lg:flex flex-col justify-center items-center w-1/2 p-12 text-white">
                <div className="bg-white/10 backdrop-blur rounded-3xl p-10 text-center max-w-sm">
                    <div className="bg-white rounded-2xl p-4 w-fit mx-auto mb-6 shadow-lg">
                        <MdMedicalServices className="text-teal-600 text-5xl" />
                    </div>
                    <h1 className="font-poppins-extrabold text-4xl mb-3">
                        Apotek ShopiCare
                    </h1>
                    <p className="text-teal-100 text-sm leading-relaxed">
                        Sistem manajemen apotek modern untuk pelayanan kesehatan yang lebih baik dan efisien.
                    </p>
                    <div className="flex justify-center gap-4 mt-8 text-sm">
                        <div className="text-center">
                            <p className="font-bold text-2xl">500+</p>
                            <p className="text-teal-200">Pasien</p>
                        </div>
                        <div className="w-px bg-white/20"></div>
                        <div className="text-center">
                            <p className="font-bold text-2xl">200+</p>
                            <p className="text-teal-200">Jenis Obat</p>
                        </div>
                        <div className="w-px bg-white/20"></div>
                        <div className="text-center">
                            <p className="font-bold text-2xl">5th</p>
                            <p className="text-teal-200">Pengalaman</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel - form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
                    {/* Logo mobile */}
                    <div className="flex items-center gap-3 mb-8 lg:hidden">
                        <div className="bg-teal-600 p-2 rounded-xl">
                            <MdMedicalServices className="text-white text-xl" />
                        </div>
                        <p className="font-poppins-extrabold text-xl text-gray-800">
                            Apotek <span className="text-teal-600">ShopiCare</span>
                        </p>
                    </div>

                    <Outlet />

                    <p className="text-center text-xs text-gray-400 mt-8">
                        &copy; 2026 Apotek ShopiCare. All rights reserved.
                    </p>
                </div>
            </div>

        </div>
    );
}
