import { NavLink } from "react-router-dom";
import {
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import {
  LuLayoutDashboard,
  LuPill,
  LuUsers,
  LuClipboardList,
  LuHeadset,
} from "react-icons/lu";
import { FaGift } from "react-icons/fa";
import { MdLogout, MdMedicalServices } from "react-icons/md";

/* ── Custom Dashboard icon (2x2 grid, top-right biru muda saat active) ── */
function IconDashboard({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="1" width="8" height="8" rx="2"
        fill={active ? "white" : "none"}
        stroke={active ? "white" : "#9ca3af"} strokeWidth="1.5" />
      <rect x="11" y="1" width="8" height="8" rx="2"
        fill={active ? "#bbcafb" : "none"}
        stroke={active ? "#bbcafb" : "#9ca3af"} strokeWidth="1.5" />
      <rect x="1" y="11" width="8" height="8" rx="2"
        fill={active ? "white" : "none"}
        stroke={active ? "white" : "#9ca3af"} strokeWidth="1.5" />
      <rect x="11" y="11" width="8" height="8" rx="2"
        fill={active ? "white" : "none"}
        stroke={active ? "white" : "#9ca3af"} strokeWidth="1.5" />
    </svg>
  );
}

/* ── Menu items — struktur apotek lama ─────────────────────── */
const menuItems = [
  { key: "dashboard",  label: "Dashboard",  to: "/" },
  { key: "transaksi",  label: "Transaksi",  to: "/transactions" },
  { key: "obat",       label: "Data Obat",  to: "/medicines" },
  { key: "pasien",     label: "Data Pasien",to: "/patients" },
];

function MenuIcon({ itemKey, active }) {
  const cls = `text-[20px] flex-shrink-0 ${active ? "text-white" : "text-gray-400"}`;
  switch (itemKey) {
    case "dashboard": return <IconDashboard active={active} />;
    case "transaksi": return <LuClipboardList className={cls} />;
    case "obat":      return <LuPill className={cls} />;
    case "pasien":    return <LuUsers className={cls} />;
    default:          return null;
  }
}

/* ── Component ─────────────────────────────────────────────── */
export default function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col bg-white shadow-xl border-r border-gray-100">

      {/* Logo — Apotek ShopiCare */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-[#5570F1] p-2 rounded-xl shadow">
            <MdMedicalServices className="text-white text-2xl" />
          </div>
          <div>
            <p className="text-lg leading-tight" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
              Apotek <span className="text-[#5570F1]">ShopiCare</span>
            </p>
            <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
              Sistem Manajemen Apotek
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 py-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2"
          style={{ fontFamily: "Inter, sans-serif" }}>
          Menu Utama
        </p>
        <ul className="space-y-1">
          {menuItems.map(({ key, label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
                  ${isActive
                    ? "bg-[#5570F1] text-white font-semibold shadow-md"
                    : "text-gray-500 hover:bg-[#eef1fe] hover:text-[#5570F1]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <MenuIcon itemKey={key} active={isActive} />
                    <span className="text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="px-4 py-5 border-t border-gray-100 space-y-3">
        {/* Contact Support */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-sm">
          <LuHeadset className="text-xl flex-shrink-0" />
          <span style={{ fontFamily: "Inter, sans-serif" }}>Contact Support</span>
        </button>

        {/* Free Gift */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl px-3 py-3">
          <div className="flex items-center gap-2 mb-1">
            <FaGift className="text-[#FFCC91] text-lg flex-shrink-0" />
            <span className="font-bold text-sm text-gray-800" style={{ fontFamily: "Inter, sans-serif" }}>
              Free Gift Awaits You!
            </span>
          </div>
          <p className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
            Upgrade your account{" "}
            <span className="text-[#5570F1] cursor-pointer">›</span>
          </p>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#CC5F5F] hover:bg-red-50 transition text-sm">
          <MdLogout className="text-xl flex-shrink-0" />
          <span style={{ fontFamily: "Inter, sans-serif" }}>Logout</span>
        </button>

        <p className="text-xs text-gray-400 text-center" style={{ fontFamily: "Inter, sans-serif" }}>
          &copy; 2026 Apotek ShopiCare
        </p>
      </div>
    </div>
  );
}