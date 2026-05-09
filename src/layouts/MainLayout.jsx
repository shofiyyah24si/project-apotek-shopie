import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen flex">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed z-30 md:static transition-transform duration-300 self-stretch
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col p-4 md:p-6 overflow-auto">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="mt-2">
          <Outlet />
        </div>
      </div>

    </div>
  );
}
