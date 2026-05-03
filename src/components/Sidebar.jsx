import { MdDashboard, MdMedicalServices } from "react-icons/md";
import { FaListUl, FaUserInjured, FaPills } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuClass = ({ isActive }) =>
  `flex cursor-pointer items-center rounded-xl p-4 space-x-2
  ${isActive
    ? "text-teal-600 bg-teal-100 font-extrabold"
    : "text-gray-600 hover:text-teal-600 hover:bg-teal-100 hover:font-extrabold"
  }`;

export default function Sidebar() {
  return (
    <div id="sidebar" className="flex min-h-screen w-64 lg:w-72 flex-col bg-white p-6 shadow-lg">

      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col mb-2">
        <span id="logo-title" className="font-poppins-extrabold text-[36px] text-gray-900 leading-tight">
          <span className="text-teal-600">Farma</span>
          <span className="text-gray-800">Care</span>
          <b className="text-teal-600">+</b>
        </span>
        <span id="logo-subtitle" className="font-semibold text-gray-400 text-sm">
          Sistem Manajemen Apotek
        </span>
      </div>

      {/* List Menu */}
      <div id="sidebar-menu" className="mt-8">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-3 px-4">Menu Utama</p>
        <ul id="menu-list" className="space-y-1">
          <li>
            <NavLink id="menu-dashboard" to="/" className={menuClass}>
              <MdDashboard className="mr-3 text-xl" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-transactions" to="/transactions" className={menuClass}>
              <FaListUl className="mr-3 text-xl" />
              <span>Transaksi</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-medicines" to="/medicines" className={menuClass}>
              <FaPills className="mr-3 text-xl" />
              <span>Data Obat</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-patients" to="/patients" className={menuClass}>
              <FaUserInjured className="mr-3 text-xl" />
              <span>Data Pasien</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto">
        <div className="bg-teal-600 px-4 py-3 rounded-xl shadow mb-6 flex items-center gap-3">
          <MdMedicalServices className="text-white text-3xl flex-shrink-0" />
          <div className="text-white text-xs">
            <p className="font-semibold">FarmaCare+</p>
            <p className="opacity-80">Apotek Sehat Sejahtera</p>
          </div>
        </div>
        <span className="font-bold text-gray-400 text-sm">FarmaCare+ Admin</span>
        <p className="font-light text-gray-400 text-xs">&copy; 2026 All Rights Reserved</p>
      </div>

    </div>
  );
}
