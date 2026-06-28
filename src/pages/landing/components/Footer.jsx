import { MdMedicalServices } from "react-icons/md";
import { LuPhone, LuMapPin, LuMail } from "react-icons/lu";

export default function Footer() {
  return (
    <footer id="kontak" className="bg-[#1C1D22] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-[#5570F1] p-2 rounded-xl">
                <MdMedicalServices className="text-white text-xl" />
              </div>
              <span className="text-lg font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                Apotek <span className="text-[#5570F1]">Shopie</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Sistem manajemen apotek modern untuk pelayanan kesehatan yang lebih baik dan efisien.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Navigasi
            </h4>
            <ul className="space-y-2">
              {["Beranda", "Katalog Obat", "Tentang Kami", "Masuk / Daftar"].map(item => (
                <li key={item}>
                  <a href="#"
                    className="text-sm text-gray-400 hover:text-white transition"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Kontak
            </h4>
            <ul className="space-y-3">
              {[
                { icon: LuMapPin, text: "Jl. Kesehatan No. 1, Pekanbaru" },
                { icon: LuPhone,  text: "0761-123-456" },
                { icon: LuMail,   text: "info@apotekshopie.com" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5 text-sm text-gray-400"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  <Icon className="flex-shrink-0 mt-0.5 text-[#5570F1]" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
            &copy; 2026 Apotek Shopie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
