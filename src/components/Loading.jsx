import { MdMedicalServices } from "react-icons/md";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 gap-4">

      {/* Logo + spinner */}
      <div className="relative">
        {/* Spinner ring */}
        <div className="w-16 h-16 border-4 border-[#dde4fd] border-t-[#5570F1] rounded-full animate-spin" />
        {/* Icon center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-9 h-9 bg-[#5570F1] rounded-xl flex items-center justify-center shadow">
          <MdMedicalServices className="text-white text-lg" />
        </div>
      </div>

      {/* Brand name */}
      <div className="text-center">
        <p className="text-[#1C1D22] text-base leading-tight"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
          Apotek <span className="text-[#5570F1]">ShopiCare</span>
        </p>
        <p className="text-gray-400 text-xs mt-1"
          style={{ fontFamily: "Inter, sans-serif" }}>
          Memuat...
        </p>
      </div>

    </div>
  );
}