import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { LuPill, LuUsers, LuBanknote } from "react-icons/lu";
import { MdLocalPharmacy, MdFolder, MdShoppingCart } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi2";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
} from "recharts";
import transactions from "../../data/transactions.json";
import medicines    from "../../data/medicines.json";
import patients     from "../../data/patients.json";

/* ── Stats ─────────────────────────────────────────────────── */
const totalPendapatan = transactions.reduce((s, t) => s + t.total, 0);
const totalPasien     = patients.length;
const pasienAktif     = patients.filter(p => new Date(p.lastVisit) >= new Date("2026-01-01")).length;
const totalTrx        = transactions.length;
const trxProses       = transactions.filter(t => t.status === "Diproses").length;
const trxSelesai      = transactions.filter(t => t.status === "Selesai").length;
const obatAktif       = medicines.filter(m => m.stock > 0).length;
const trxBatal        = transactions.filter(t => t.status === "Dibatalkan").length;

/* ── Bar chart ──────────────────────────────────────────────── */
const summaryData = [
  { day: "5 Jan",  value: 50000  },
  { day: "8 Jan",  value: 51000  },
  { day: "10 Jan", value: 60000  },
  { day: "12 Jan", value: 48000  },
  { day: "14 Jan", value: 270000 },
  { day: "15 Jan", value: 110000 },
  { day: "18 Jan", value: 90000  },
];

/* ── Donut ──────────────────────────────────────────────────── */
const kategoriMap = medicines.reduce((acc, m) => {
  acc[m.category] = (acc[m.category] || 0) + 1;
  return acc;
}, {});
const donutColors = ["#5570F1", "#93c5fd", "#FFCC91"];
const donutData = Object.entries(kategoriMap).slice(0, 3).map(([name, value], i) => ({
  name, value, color: donutColors[i],
}));

/* ── Recent transactions ────────────────────────────────────── */
const recentTrx = transactions.slice(0, 9);
const statusStyle = {
  Selesai:    "bg-green-100 text-green-600",
  Diproses:   "bg-red-100 text-red-400",
  Dibatalkan: "bg-gray-100 text-gray-400",
};

const statusLabel = {
  Selesai:    "Completed",
  Diproses:   "Pending",
  Dibatalkan: "Cancelled",
};

function WeekBadge() {
  return (
    <button className="flex items-center gap-1 text-xs text-gray-400">
      Minggu Ini <FaChevronDown className="text-[10px]" />
    </button>
  );
}

export default function Dashboard() {
  const [activeBar, setActiveBar] = useState(null);

  return (
    <div className="space-y-3">

      {/* Title + breadcrumb */}
      <div>
        <h1 className="text-2xl font-bold text-[#1C1D22]"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          Dashboard
        </h1>
        <div className="flex items-center gap-1.5 mt-0.5 text-sm">
          <HiOutlineHome className="text-base text-gray-400" />
          <span className="text-gray-400">/</span>
          <span className="text-[#5570F1] font-medium text-xs"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Dashboard
          </span>
        </div>
      </div>

      {/* ── Row 1: 3 stat cards ─────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">

        {/* Pendapatan */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#eef1fe] flex items-center justify-center">
              <LuBanknote className="text-[#5570F1] text-lg" />
            </div>
            <WeekBadge />
          </div>
          <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
            Pendapatan
          </p>
          <div className="flex items-end gap-3 flex-wrap">
            <p className="text-xl font-bold text-[#1C1D22]"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Rp {(totalPendapatan / 1000000).toFixed(2)}jt
            </p>
            <div>
              <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>Volume</p>
              <p className="text-sm font-semibold text-[#1C1D22]"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {totalTrx} <span className="text-[#519C66] font-normal">+20.00%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Pasien */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#eef1fe] flex items-center justify-center">
              <LuUsers className="text-[#5570F1] text-lg" />
            </div>
            <WeekBadge />
          </div>
          <div className="flex items-end gap-5">
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Total Pasien</p>
              <p className="text-xl font-bold text-[#1C1D22]"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                {totalPasien} <span className="text-[#519C66] text-sm font-normal">+15.80%</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Aktif</p>
              <p className="text-xl font-bold text-[#1C1D22]"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                {pasienAktif} <span className="text-xs text-gray-400 font-normal">
                  {Math.round((pasienAktif/totalPasien)*100)}%
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Transaksi */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#eef1fe] flex items-center justify-center">
              <MdShoppingCart className="text-[#5570F1] text-lg" />
            </div>
            <WeekBadge />
          </div>
          <div className="flex items-end gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Semua</p>
              <p className="text-xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>{totalTrx}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Diproses</p>
              <p className="text-xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>{trxProses}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Selesai</p>
              <p className="text-xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>{trxSelesai}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Donut | Blue card + Abandoned | Recent ───── */}
      <div className="grid grid-cols-3 gap-3">

        {/* Donut — Kategori Obat */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-[#1C1D22] text-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Kategori Obat
            </p>
            <WeekBadge />
          </div>
          <div className="flex gap-2 mb-1 flex-wrap">
            {donutData.map(d => (
              <div key={d.name} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                  {d.name}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <PieChart width={160} height={160}>
              <Pie data={donutData} cx={75} cy={75}
                innerRadius={48} outerRadius={70}
                dataKey="value" strokeWidth={0}>
                {donutData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </div>
        </div>

        {/* Middle: Blue card + Abandoned */}
        <div className="flex flex-col gap-3">
          {/* Stok Obat — primary */}
          <div className="bg-[#5570F1] rounded-2xl p-4 text-white flex-1">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mb-3">
              <MdFolder className="text-white text-lg" />
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-xs text-[#bbcafb] mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Total Obat
                </p>
                <p className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {medicines.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#bbcafb] mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Tersedia
                </p>
                <p className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {obatAktif}{" "}
                  <span className="text-sm font-normal text-[#bbcafb]">
                    +{Math.round((obatAktif/medicines.length)*100)}%
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Transaksi Dibatalkan */}
          <div className="bg-white rounded-2xl p-4 shadow-sm flex-1">
            <div className="flex justify-between items-start mb-2">
              <div className="w-8 h-8 rounded-xl bg-[#eef1fe] flex items-center justify-center">
                <MdLocalPharmacy className="text-[#5570F1] text-base" />
              </div>
              <WeekBadge />
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-xs text-[#CC5F5F] mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Dibatalkan
                </p>
                <p className="text-xl font-bold text-[#CC5F5F]"
                  style={{ fontFamily: "Poppins, sans-serif" }}>
                  {trxBatal}{" "}
                  <span className="text-xs text-gray-400 font-normal">+0.00%</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Pasien
                </p>
                <p className="text-xl font-bold text-[#1C1D22]"
                  style={{ fontFamily: "Poppins, sans-serif" }}>
                  {totalPasien}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm overflow-hidden">
          <p className="font-semibold text-[#1C1D22] text-sm mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Transaksi Terbaru
          </p>
          <div className="space-y-2 overflow-y-auto" style={{ maxHeight: 260 }}>
            {recentTrx.map(t => (
              <div key={t.id} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#eef1fe] flex items-center justify-center flex-shrink-0">
                  <LuPill className="text-[#5570F1] text-xs" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1C1D22] truncate"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    {t.medicine}
                  </p>
                  <p className="text-[10px] text-gray-400 truncate"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    Rp {t.total.toLocaleString("id-ID")} × {t.qty}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[9px] text-gray-400 mb-0.5">{t.date}</p>
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${statusStyle[t.status]}`}>
                    {statusLabel[t.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Bar chart ──────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-[#1C1D22] text-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Ringkasan
            </p>
            <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-[#5570F1] font-medium outline-none bg-[#eef1fe]"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <option>Pendapatan</option>
              <option>Transaksi</option>
              <option>Pasien</option>
            </select>
          </div>
          <button className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-2 py-1 hover:bg-gray-50"
            style={{ fontFamily: "Inter, sans-serif" }}>
            7 Hari Terakhir <FaChevronDown className="text-[9px] ml-1" />
          </button>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={summaryData} barSize={24} barGap={6}>
            <XAxis dataKey="day" axisLine={false} tickLine={false}
              tick={{ fontSize: 10, fill: "#9ca3af", fontFamily: "Inter, sans-serif" }} />
            <YAxis axisLine={false} tickLine={false}
              tick={{ fontSize: 10, fill: "#9ca3af", fontFamily: "Inter, sans-serif" }}
              tickFormatter={v => `${v/1000}k`} />
            <Tooltip
              formatter={v => [`Rp ${v.toLocaleString("id-ID")}`, "Pendapatan"]}
              cursor={{ fill: "transparent" }} />
            <Bar dataKey="value" radius={[5, 5, 0, 0]}>
              {summaryData.map((_, i) => (
                <Cell key={i}
                  fill={i === activeBar ? "#5570F1" : "#dde4fd"}
                  onMouseEnter={() => setActiveBar(i)}
                  onMouseLeave={() => setActiveBar(null)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}