import { FaPills, FaUserInjured, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import PageHeader from "../../components/PageHeader";
import RecentTransactions from "../../components/RecentTransactions";

const stats = [
  { icon: <FaPills />, label: "Total Obat", value: "128", color: "bg-teal-500", light: "bg-teal-50 text-teal-600" },
  { icon: <FaUserInjured />, label: "Total Pasien", value: "340", color: "bg-blue-500", light: "bg-blue-50 text-blue-600" },
  { icon: <FaCheckCircle />, label: "Transaksi Selesai", value: "215", color: "bg-green-500", light: "bg-green-50 text-green-600" },
  { icon: <FaMoneyBillWave />, label: "Total Pendapatan", value: "Rp 12,4jt", color: "bg-amber-400", light: "bg-amber-50 text-amber-600" },
];

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" breadcrumb={["Home", "Dashboard"]} />

      {/* Welcome banner */}
      <div className="mx-5 mb-5 bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl p-6 text-white flex items-center justify-between shadow-lg">
        <div>
          <p className="text-teal-100 text-sm mb-1">Selamat datang kembali 👋</p>
          <h2 className="text-2xl font-poppins-extrabold">Apotek ShopiCare</h2>
          <p className="text-teal-100 text-sm mt-1">Senin, 3 Mei 2026</p>
        </div>
        <div className="bg-white/20 rounded-2xl p-4 hidden sm:block">
          <MdTrendingUp className="text-4xl text-white" />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="px-5 grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`${s.light} p-3 rounded-xl text-xl`}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabel Transaksi Terbaru */}
      <div className="px-5">
        <RecentTransactions />
      </div>

    </div>
  );
}
