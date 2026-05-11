import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPass, setShowPass]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1C1D22] mb-1"
        style={{ fontFamily: "Poppins, sans-serif" }}>
        Daftar Akun
      </h2>
      <p className="text-sm text-gray-400 mb-7"
        style={{ fontFamily: "Inter, sans-serif" }}>
        Buat akun apoteker baru
      </p>

      <form className="space-y-4">
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-[#1C1D22] mb-1.5"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Nama Lengkap
          </label>
          <input type="text"
            placeholder="Nama lengkap Anda"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#5570F1] focus:ring-2 focus:ring-[#eef1fe] transition"
            style={{ fontFamily: "Inter, sans-serif" }} />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#1C1D22] mb-1.5"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Email
          </label>
          <input type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#5570F1] focus:ring-2 focus:ring-[#eef1fe] transition"
            style={{ fontFamily: "Inter, sans-serif" }} />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-[#1C1D22] mb-1.5"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Password
          </label>
          <div className="relative">
            <input type={showPass ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#5570F1] focus:ring-2 focus:ring-[#eef1fe] transition pr-10"
              style={{ fontFamily: "Inter, sans-serif" }} />
            <button type="button" onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              style={{ fontFamily: "Inter, sans-serif" }}>
              {showPass ? "Sembunyikan" : "Tampilkan"}
            </button>
          </div>
        </div>

        {/* Konfirmasi Password */}
        <div>
          <label className="block text-sm font-medium text-[#1C1D22] mb-1.5"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Konfirmasi Password
          </label>
          <div className="relative">
            <input type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#5570F1] focus:ring-2 focus:ring-[#eef1fe] transition pr-10"
              style={{ fontFamily: "Inter, sans-serif" }} />
            <button type="button" onClick={() => setShowConfirm(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              style={{ fontFamily: "Inter, sans-serif" }}>
              {showConfirm ? "Sembunyikan" : "Tampilkan"}
            </button>
          </div>
        </div>

        {/* Toggle Add Address (referensi Metrix) */}
        <div className="flex items-center justify-between py-1">
          <span className="text-sm text-gray-500"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Tambah Alamat
          </span>
          <button type="button"
            className="w-10 h-5 bg-gray-200 rounded-full relative transition">
            <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform" />
          </button>
        </div>

        <button type="submit"
          className="w-full bg-[#5570F1] hover:bg-[#4460e0] text-white font-semibold py-2.5 rounded-xl transition text-sm"
          style={{ fontFamily: "Inter, sans-serif" }}>
          Daftar
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6"
        style={{ fontFamily: "Inter, sans-serif" }}>
        Sudah punya akun?{" "}
        <Link to="/login" className="text-[#5570F1] font-semibold hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  );
}