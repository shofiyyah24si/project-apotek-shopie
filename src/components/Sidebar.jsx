import { MdDashboard, MdMedicalServices } from "react-icons/md";
import { FaListUl, FaUserInjured, FaPills } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuClass = ({ isActive }) =>
  `flex cursor-pointer items-center rounded-xl px-4 py-3 gap-3 transition-all duration-200
  ${isActive
    ? "bg-teal-600 text-white font-semibold shadow-md"
    : "text-gray-500 hover:bg-teal-50 hover:text-teal-600"
  }`;

export default function Sidebar() {
  return (
    <div id="sidebar" className="flex h-full min-h-screen w-64 flex-col bg-white shadow-xl border-r border-gray-100 self-stretch">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-teal-600 p-2 rounded-xl shadow">
            <MdMedicalServices className="text-white text-2xl" />
          </div>
          <div>
            <p className="font-poppins-extrabold text-lg text-gray-800 leading-tight">
              Apotek <span className="text-teal-600">ShopiCare</span>
            </p>
            <p className="text-xs text-gray-400">Sistem Manajemen Apotek</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 py-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Menu Utama</p>
        <ul className="space-y-1">
          <li>
            <NavLink to="/" className={menuClass}>
              <MdDashboard className="text-xl flex-shrink-0" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/transactions" className={menuClass}>
              <FaListUl className="text-lg flex-shrink-0" />
              <span>Transaksi</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/medicines" className={menuClass}>
              <FaPills className="text-lg flex-shrink-0" />
              <span>Data Obat</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/patients" className={menuClass}>
              <FaUserInjured className="text-lg flex-shrink-0" />
              <span>Data Pasien</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="px-4 py-5 border-t border-gray-100">
        <div className="bg-teal-600 rounded-xl p-4 text-white mb-4">
          <p className="font-semibold text-sm">Apotek ShopiCare</p>
          <p className="text-xs opacity-75 mt-0.5">Sehat itu mudah bersama kami</p>
        </div>
        <p className="text-xs text-gray-400 text-center">&copy; 2026 Apotek ShopiCare</p>
      </div>

    </div>
  );
}
