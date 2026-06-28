import { useState } from "react";
import { Link } from "react-router-dom";
import { MdMedicalServices, MdMenu, MdClose } from "react-icons/md";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = ["Beranda", "Katalog Obat", "Tentang Kami"];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="bg-[#5570F1] p-2 rounded-xl">
            <MdMedicalServices className="text-white text-xl" />
          </div>
          <span className="text-lg font-bold text-[#1C1D22]"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Apotek <span className="text-[#5570F1]">Shopie</span>
          </span>
        </div>

        {/* Nav links — desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <li key={link}>
              <a href="#"
                className="text-sm text-gray-600 hover:text-[#5570F1] font-medium transition"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login"
            className="text-sm font-medium text-[#5570F1] hover:underline"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Masuk
          </Link>
          <Link to="/register"
            className="bg-[#5570F1] hover:bg-[#4460e0] text-white text-sm font-medium px-4 py-2 rounded-xl transition"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Daftar
          </Link>
        </div>

        {/* Hamburger — mobile */}
        <button className="md:hidden text-gray-600" onClick={() => setOpen(!open)}>
          {open ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {navLinks.map(link => (
            <a key={link} href="#"
              className="block text-sm text-gray-600 hover:text-[#5570F1] font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}>
              {link}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/login"
              className="flex-1 text-center text-sm text-[#5570F1] border border-[#5570F1] py-2 rounded-xl"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Masuk
            </Link>
            <Link to="/register"
              className="flex-1 text-center text-sm text-white bg-[#5570F1] py-2 rounded-xl"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Daftar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
