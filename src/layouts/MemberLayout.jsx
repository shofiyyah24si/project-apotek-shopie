import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LuLayoutDashboard, LuPill, LuShoppingCart, LuMessageSquare, LuMenu } from "react-icons/lu";
import { MdLogout, MdMedicalServices } from "react-icons/md";

const menuMember = [
  { key: "dashboard", label: "Dashboard",          to: "/member",           icon: LuLayoutDashboard },
  { key: "katalog",   label: "Katalog Obat",        to: "/member/katalog",   icon: LuPill },
  { key: "riwayat",   label: "Riwayat Transaksi",   to: "/member/riwayat",   icon: LuShoppingCart },
  { key: "komplain",  label: "Komplain & Feedback", to: "/member/komplain",  icon: LuMessageSquare },
];

export default function MemberLayout() {
  const navigate   = useNavigate();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">

      {/* Overlay mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed z-30 md:static transition-transform duration-300 flex min-h-screen w-64 flex-col bg-white shadow-xl border-r border-gray-100 self-stretch
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-[#519C66] p-2 rounded-xl shadow">
              <MdMedicalServices className="text-white text-2xl" />
            </div>
            <div>
              <p className="text-lg leading-tight" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                Apotek <span className="text-[#519C66]">ShopiCare</span>
              </p>
              <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                Portal Member
              </p>
            </div>
          </div>
        </div>

        {/* Info user */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-100 text-[#519C66] flex items-center justify-center font-bold text-sm flex-shrink-0">
              {user.nama?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#1C1D22] truncate"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {user.nama}
              </p>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-[#519C66]"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {user.level || "Bronze"} Member
              </span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 px-4 py-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Menu Member
          </p>
          <ul className="space-y-1">
            {menuMember.map(({ label, to, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/member"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
                    ${isActive
                      ? "bg-[#519C66] text-white font-semibold shadow-md"
                      : "text-gray-500 hover:bg-green-50 hover:text-[#519C66]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`text-[20px] flex-shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
                      <span className="text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#CC5F5F] hover:bg-red-50 transition text-sm">
            <MdLogout className="text-xl flex-shrink-0" />
            <span style={{ fontFamily: "Inter, sans-serif" }}>Logout</span>
          </button>
          <p className="text-xs text-gray-400 text-center mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
            &copy; 2026 Apotek ShopiCare
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Mobile topbar */}
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setOpen(true)}>
            <LuMenu className="text-xl text-gray-500" />
          </button>
          <p className="font-semibold text-[#1C1D22] text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
            Apotek ShopiCare
          </p>
        </div>

        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
