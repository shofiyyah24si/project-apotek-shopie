import { FaSearch, FaBell, FaBars } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import { useState } from "react";
import { SlSettings } from "react-icons/sl";
import SearchModal from "./SearchModal";

export default function Header({ onToggleSidebar }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white rounded-2xl px-5 py-3 shadow-sm mb-2">

      <button
        className="md:hidden p-2 rounded-lg bg-gray-100 mr-3 text-gray-600"
        onClick={onToggleSidebar}
      >
        <FaBars className="text-xl" />
      </button>

      {/* Search */}
      <div className="relative w-full max-w-sm cursor-pointer" onClick={() => setSearchOpen(true)}>
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
        <input
          type="text"
          placeholder="Cari obat, pasien, transaksi..."
          readOnly
          className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer text-gray-500"
        />
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-3 ml-4">

        <button className="relative p-2.5 bg-teal-50 rounded-xl text-teal-600 hover:bg-teal-100 transition">
          <FaBell className="text-lg" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="p-2.5 bg-teal-50 rounded-xl text-teal-600 hover:bg-teal-100 transition">
          <MdMedicalServices className="text-lg" />
        </button>

        <button className="p-2.5 bg-red-50 rounded-xl text-red-400 hover:bg-red-100 transition">
          <SlSettings className="text-lg" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-700">Shopie</p>
            <p className="text-xs text-gray-400">Apoteker</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm shadow">
            SP
          </div>
        </div>

      </div>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
