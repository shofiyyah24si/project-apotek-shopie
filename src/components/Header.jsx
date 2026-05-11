import { FaBell, FaBars, FaChevronDown, FaSearch } from "react-icons/fa";
import { useState } from "react";
import SearchModal from "./SearchModal";

export default function Header({ onToggleSidebar }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white px-6 py-3 shadow-sm border-b border-gray-100">

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 rounded-lg bg-gray-100 mr-3 text-gray-600"
        onClick={onToggleSidebar}
      >
        <FaBars className="text-xl" />
      </button>

      {/* Search bar — kiri */}
      <div
        className="relative w-full max-w-sm cursor-pointer"
        onClick={() => setSearchOpen(true)}
      >
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
        <input
          type="text"
          placeholder="Cari obat, pasien, transaksi..."
          readOnly
          className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer text-gray-400"
          style={{ fontFamily: "Inter, sans-serif" }}
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-4">

        {/* Apotek dropdown — ganti "Nanny's Shop" */}
        <button
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span className="font-medium">Apotek ShopiCare</span>
          <FaChevronDown className="text-xs text-gray-400" />
        </button>

        {/* Bell */}
        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition">
          <FaBell className="text-xl" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#5570F1] rounded-full"></span>
        </button>

        {/* Avatar + nama */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-[#1C1D22]"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Shopie
            </p>
            <p className="text-xs text-gray-400"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Apoteker
            </p>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
            <img
              src="/img/foto profil.JPG"
              alt="profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.classList.add(
                  "bg-[#5570F1]", "flex", "items-center", "justify-center"
                );
                e.target.parentElement.innerHTML =
                  '<span style="color:white;font-weight:700;font-size:14px">SP</span>';
              }}
            />
          </div>
        </div>
      </div>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  );
}