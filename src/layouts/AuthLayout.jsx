import { Outlet } from "react-router-dom";
import { MdMedicalServices } from "react-icons/md";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 p-12 bg-[#5570F1] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute bottom-[-60px] left-[-60px] w-56 h-56 rounded-full bg-white/10" />
        <div className="absolute top-1/2 left-[-40px] w-32 h-32 rounded-full bg-[#FFCC91]/20" />

        <div className="relative z-10 text-center max-w-sm">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-white rounded-2xl p-3 shadow-lg">
              <MdMedicalServices className="text-[#5570F1] text-4xl" />
            </div>
            <div className="text-left">
              <p className="text-white text-2xl leading-tight"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                Apotek
              </p>
              <p className="text-[#FFCC91] text-2xl leading-tight"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                ShopiCare
              </p>
            </div>
          </div>

          <p className="text-white/80 text-sm leading-relaxed mb-10"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Sistem manajemen apotek modern untuk pelayanan kesehatan yang lebih baik dan efisien.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6">
            {[
              { value: "500+", label: "Pasien" },
              { value: "200+", label: "Jenis Obat" },
              { value: "5th",  label: "Pengalaman" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-bold text-2xl text-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}>
                  {s.value}
                </p>
                <p className="text-white/60 text-xs mt-0.5"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">

          {/* Logo mobile */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="bg-[#5570F1] p-2 rounded-xl">
              <MdMedicalServices className="text-white text-xl" />
            </div>
            <p className="text-xl text-[#1C1D22]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
              Apotek <span className="text-[#5570F1]">ShopiCare</span>
            </p>
          </div>

          <Outlet />

          <p className="text-center text-xs text-gray-400 mt-8"
            style={{ fontFamily: "Inter, sans-serif" }}>
            &copy; 2026 Apotek ShopiCare. All rights reserved.
          </p>
        </div>
      </div>

    </div>
  );
}