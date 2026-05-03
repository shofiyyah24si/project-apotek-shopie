import { FaPills, FaUserInjured, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import RecentTransactions from "../../components/RecentTransactions";

export default function Dashboard() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Dashboard" breadcrumb={["Home", "Dashboard"]} />

      {/* Stat Cards */}
      <div id="dashboard-grid" className="p-5 grid grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="flex items-center space-x-4 bg-white rounded-xl shadow-sm p-4">
          <div className="bg-teal-500 rounded-full p-4">
            <FaPills className="text-2xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">128</span>
            <span className="text-gray-400 text-sm">Total Obat</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white rounded-xl shadow-sm p-4">
          <div className="bg-blue-500 rounded-full p-4">
            <FaUserInjured className="text-2xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">340</span>
            <span className="text-gray-400 text-sm">Total Pasien</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white rounded-xl shadow-sm p-4">
          <div className="bg-green-500 rounded-full p-4">
            <FaCheckCircle className="text-2xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">215</span>
            <span className="text-gray-400 text-sm">Transaksi Selesai</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white rounded-xl shadow-sm p-4">
          <div className="bg-yellow-400 rounded-full p-4">
            <FaMoneyBillWave className="text-2xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">Rp 12,4jt</span>
            <span className="text-gray-400 text-sm">Total Pendapatan</span>
          </div>
        </div>

      </div>

      {/* Tabel Transaksi Terbaru */}
      <div className="px-5">
        <RecentTransactions />
      </div>

    </div>
  );
}
