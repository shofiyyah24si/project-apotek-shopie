import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div
          className={`fixed z-30 md:static transition-transform duration-300 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
          <Sidebar />
        </div>

        <div id="main-content" className="flex-1 p-4 md:ml-0">
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="mt-4">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
}
