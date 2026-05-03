import { FaSearch, FaBell, FaBars } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import { useState } from "react";
import { SlSettings } from "react-icons/sl";
import SearchModal from "./SearchModal";

export default function Header({ onToggleSidebar }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div id="header-container" className="flex justify-between items-center p-4">

      <button
        className="md:hidden p-2 rounded-lg bg-white shadow mr-3 text-gray-600"
        onClick={onToggleSidebar}
      >
        <FaBars className="text-xl" />
      </button>

      <div
        id="search-bar"
        className="relative w-full max-w-lg cursor-pointer"
        onClick={() => setSearchOpen(true)}
      >
        <input
          id="search-input"
          type="text"
          placeholder="Cari obat, pasien, transaksi..."
          readOnly
          className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none cursor-pointer"
        />
        <FaSearch id="search-icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
      </div>

      <div id="icons-container" className="flex items-center space-x-4">

        <div id="notification-icon" className="relative p-3 bg-teal-100 rounded-2xl text-teal-600 cursor-pointer">
          <FaBell />
          <span id="notification-badge" className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-teal-200 rounded-full px-2 py-1 text-xs">
            5
          </span>
        </div>

        <div id="medical-icon" className="p-3 bg-teal-100 rounded-2xl text-teal-600 cursor-pointer">
          <MdMedicalServices />
        </div>

        <div id="settings-icon" className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer">
          <SlSettings />
        </div>

        <div id="profile-container" className="flex items-center space-x-3 border-l pl-4 border-gray-300">
          <span id="profile-text" className="text-sm">
            Halo, <b>Apoteker</b>
          </span>
          <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
            AP
          </div>
        </div>

      </div>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

    </div>
  );
}
