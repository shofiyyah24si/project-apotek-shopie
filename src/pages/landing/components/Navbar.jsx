import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdMedicalServices, MdMenu, MdClose } from "react-icons/md";

const navLinks = [
  { label: "Beranda",    href: "#beranda",   sectionId: "beranda" },
  { label: "Informasi",  href: "#informasi", sectionId: "informasi" },
  { label: "Katalog",    href: "#katalog",   sectionId: "katalog" },
  { label: "Member",     href: "#member",    sectionId: "member" },
  { label: "Kontak",     href: "#kontak",    sectionId: "kontak" },
];

export default function Navbar() {
  const [open, setOpen]           = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  // Deteksi section yang sedang terlihat di viewport
  useEffect(() => {
    const sectionIds = ["beranda", "informasi", "katalog", "member", "kontak"];

    const observers = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const handleNavClick = (href) => {
    setOpen(false);
    if (href === "#beranda") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 cursor-pointer">
          <div className="bg-[#5570F1] p-2 rounded-xl">
            <MdMedicalServices className="text-white text-xl" />
          </div>
          <span className="text-lg font-bold text-[#1C1D22]"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Apotek <span className="text-[#5570F1]">Shopie</span>
          </span>
        </a>

        {/* Nav links — desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href, sectionId }) => {
            const isActive = activeSection === sectionId;
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => handleNavClick(href)}
                  className={`text-sm font-medium px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-[#eef1fe] text-[#5570F1]"
                      : "text-gray-600 hover:text-[#5570F1] hover:bg-gray-50"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {label}
                </a>
              </li>
            );
          })}
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
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1">
          {navLinks.map(({ label, href, sectionId }) => {
            const isActive = activeSection === sectionId;
            return (
              <a key={label} href={href}
                onClick={() => handleNavClick(href)}
                className={`block text-sm font-medium px-3 py-2 rounded-xl transition ${
                  isActive
                    ? "bg-[#eef1fe] text-[#5570F1]"
                    : "text-gray-600 hover:text-[#5570F1]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}>
                {label}
              </a>
            );
          })}
          <div className="flex gap-3 pt-3">
            <Link to="/login" onClick={() => setOpen(false)}
              className="flex-1 text-center text-sm text-[#5570F1] border border-[#5570F1] py-2 rounded-xl"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Masuk
            </Link>
            <Link to="/register" onClick={() => setOpen(false)}
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
