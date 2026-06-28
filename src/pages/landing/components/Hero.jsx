import { Link } from "react-router-dom";
import { LuShieldCheck, LuClock, LuPill } from "react-icons/lu";

export default function Hero() {
  return (
    <section id="beranda" className="bg-gradient-to-br from-[#eef1fe] via-white to-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Teks */}
        <div className="flex-1 text-center md:text-left">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-[#5570F1]/10 text-[#5570F1] text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
            style={{ fontFamily: "Inter, sans-serif" }}>
            <LuShieldCheck className="text-sm" /> Apotek Terpercaya Sejak 2026
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1C1D22] leading-tight mb-5"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Solusi Kesehatan <span className="text-[#5570F1]">Keluarga Anda</span>,<br />
            Cepat & Terpercaya.
          </h1>

          <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Menyediakan obat asli, vitamin, dan konsultasi kesehatan langsung dari
            apoteker berpengalaman. Kesehatan Anda prioritas kami.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a href="#katalog"
              className="bg-[#5570F1] hover:bg-[#4460e0] text-white font-semibold px-7 py-3.5 rounded-2xl transition text-sm shadow-lg shadow-[#5570F1]/30"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Cari Obat Sekarang
            </a>
            <a href="#member"
              className="border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium px-7 py-3.5 rounded-2xl transition text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Daftar Member Gratis
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-10 justify-center md:justify-start">
            {[
              { icon: LuPill,        value: "200+", label: "Jenis Obat" },
              { icon: LuShieldCheck, value: "100%", label: "Produk Asli" },
              { icon: LuClock,       value: "15th",  label: "Pengalaman" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-[#5570F1]"
                  style={{ fontFamily: "Poppins, sans-serif" }}>
                  {value}
                </p>
                <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ilustrasi */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-sm">
            <div className="bg-[#5570F1] rounded-3xl w-full aspect-square flex items-center justify-center shadow-2xl shadow-[#5570F1]/20 overflow-hidden">
              <img
                src="/img/obat1.png"
                alt="Apotek Shopie"
                className="w-full h-full object-cover rounded-3xl opacity-90"
                onError={e => { e.target.style.display = "none"; }}
              />
              {/* Fallback overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <LuPill className="text-6xl opacity-30 mb-3" />
                <p className="text-lg font-bold opacity-40" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Apotek Shopie
                </p>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
                <LuShieldCheck className="text-green-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1C1D22]"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  Obat Terverifikasi
                </p>
                <p className="text-[10px] text-gray-400"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  BPOM Approved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
