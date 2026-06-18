import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuPill, LuShoppingCart, LuStar, LuTrendingUp } from "react-icons/lu";
import { transactionAPI } from "../../services/userAPI";

// Mapping level → info upgrade
const levelInfo = {
  Bronze:   { next: "Silver",   color: "bg-orange-100 text-orange-700",   tip: "Tingkatkan transaksi Anda untuk naik ke Silver Member dan dapatkan diskon obat 5%." },
  Silver:   { next: "Gold",     color: "bg-gray-100 text-gray-600",       tip: "Anda hampir ke Gold! Tambah 3 transaksi lagi untuk dapatkan diskon obat 10%." },
  Gold:     { next: "Platinum", color: "bg-yellow-100 text-yellow-700",   tip: "Sedikit lagi Platinum! Nikmati keuntungan eksklusif dengan naik level." },
  Platinum: { next: null,       color: "bg-purple-100 text-purple-700",   tip: "Anda sudah di level tertinggi! Nikmati semua keuntungan Platinum Member." },
};

// Data syarat tiap level
const tierData = [
  { tier: "Bronze",   trx: "0 – 4 transaksi",    nominal: "< Rp 500.000",    dot: "bg-orange-400", badge: "bg-orange-100 text-orange-700" },
  { tier: "Silver",   trx: "5 – 9 transaksi",    nominal: "Rp 500K – 1,5jt", dot: "bg-gray-400",   badge: "bg-gray-100 text-gray-600" },
  { tier: "Gold",     trx: "10 – 19 transaksi",  nominal: "Rp 1,5jt – 3jt",  dot: "bg-yellow-400", badge: "bg-yellow-100 text-yellow-700" },
  { tier: "Platinum", trx: "≥ 20 transaksi",     nominal: "> Rp 3.000.000",  dot: "bg-purple-400", badge: "bg-purple-100 text-purple-700" },
];

export default function DashboardMember() {
  // Ambil data user dari localStorage (session)
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]           = useState(false);
  const [showTier, setShowTier]         = useState(false); // state modal tier

  // useEffect: ambil riwayat transaksi user saat halaman dibuka
  useEffect(() => {
    if (user.id) loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      // CRM Analitis: ambil transaksi milik user ini saja
      const data = await transactionAPI.fetchByUser(user.id);
      setTransactions(data);
    } catch (err) {
      console.error("Gagal memuat transaksi:", err);
    } finally {
      setLoading(false);
    }
  };

  const level     = user.level || "Bronze";
  const levelMeta = levelInfo[level] || levelInfo.Bronze;

  // CRM Analitis: obat terakhir dibeli
  const lastMedicine = transactions[0]?.medicine || null;

  // Rekomendasi berdasarkan obat terakhir
  const getRekomendasi = (medicine) => {
    if (!medicine) return "Belum ada riwayat pembelian.";
    if (medicine.toLowerCase().includes("paracetamol"))
      return "Anda sering membeli Paracetamol. Pertimbangkan juga Vitamin C untuk menjaga daya tahan tubuh.";
    if (medicine.toLowerCase().includes("vitamin"))
      return "Bagus! Anda rutin konsumsi vitamin. Tambahkan Multivitamin Imboost untuk imun lebih kuat.";
    if (medicine.toLowerCase().includes("amoxicillin"))
      return "Setelah antibiotik, konsumsi Probiotik untuk menjaga kesehatan pencernaan.";
    return `Berdasarkan pembelian terakhir (${medicine}), konsultasikan kebutuhan obat rutin Anda ke apoteker.`;
  };

  const totalTransaksi  = transactions.length;
  const totalPengeluaran = transactions.reduce((s, t) => s + (t.total || 0), 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
          Selamat Datang, {user.nama} 👋
        </h1>
        <p className="text-sm text-gray-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
          Apotek ShopiCare — Portal Member
        </p>
      </div>

      {/* ── CRM Strategis: Tiering Membership ─────────────── */}
      <div className={`rounded-2xl p-5 border-2 ${
        level === "Platinum" ? "border-purple-200 bg-purple-50" :
        level === "Gold"     ? "border-yellow-200 bg-yellow-50" :
        level === "Silver"   ? "border-gray-200 bg-gray-50" :
                               "border-orange-200 bg-orange-50"
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <LuStar className={`text-2xl ${
              level === "Platinum" ? "text-purple-500" :
              level === "Gold"     ? "text-yellow-500" :
              level === "Silver"   ? "text-gray-500"   : "text-orange-500"
            }`} />
            <div>
              <p className="text-xs text-gray-500 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>Level Keanggotaan</p>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${levelMeta.color}`}
                style={{ fontFamily: "Inter, sans-serif" }}>
                {level} Member
              </span>
            </div>
          </div>
          {levelMeta.next && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <LuTrendingUp className="text-sm" />
              Target: {levelMeta.next} Member
            </div>
          )}
        </div>
        <p className="mt-3 text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
          {levelMeta.tip}
        </p>
        {/* Tombol lihat syarat tier — buka modal */}
        <button
          onClick={() => setShowTier(true)}
          className="mt-3 text-xs font-medium text-[#5570F1] hover:underline flex items-center gap-1"
          style={{ fontFamily: "Inter, sans-serif" }}>
          Lihat syarat naik level →
        </button>
      </div>

      {/* ── Modal Tier ──────────────────────────────────────── */}
      {showTier && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTier(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
                Syarat Naik Level
              </h3>
              <button onClick={() => setShowTier(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="space-y-2">
              {tierData.map(t => (
                <div key={t.tier}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    level === t.tier ? "bg-[#eef1fe] border border-[#5570F1]" : "bg-gray-50"
                  }`}>
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${t.dot}`} />
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full w-16 text-center ${t.badge}`}
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    {t.tier}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-gray-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                      {t.trx}
                    </p>
                    <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                      {t.nominal}
                    </p>
                  </div>
                  {level === t.tier && (
                    <span className="text-[10px] font-bold text-[#5570F1]"
                      style={{ fontFamily: "Inter, sans-serif" }}>
                      ✓ Kamu
                    </span>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => setShowTier(false)}
              className="mt-4 w-full py-2 bg-[#5570F1] text-white text-sm font-medium rounded-xl hover:bg-[#4460e0] transition"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ── Stat Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-[#eef1fe] flex items-center justify-center mb-3">
            <LuShoppingCart className="text-[#5570F1] text-lg" />
          </div>
          <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Total Transaksi</p>
          <p className="text-2xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
            {loading ? "..." : totalTransaksi}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center mb-3">
            <LuPill className="text-green-600 text-lg" />
          </div>
          <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Total Pengeluaran</p>
          <p className="text-xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
            {loading ? "..." : `Rp ${totalPengeluaran.toLocaleString("id-ID")}`}
          </p>
        </div>
        <div className="bg-[#5570F1] rounded-2xl p-5 text-white">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center mb-3">
            <LuStar className="text-white text-lg" />
          </div>
          <p className="text-xs text-[#bbcafb] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Level Saat Ini</p>
          <p className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>{level}</p>
        </div>
      </div>

      {/* ── CRM Analitis: Rekomendasi Sehat ────────────────── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#1C1D22] mb-3 flex items-center gap-2"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          <LuPill className="text-[#5570F1]" /> Rekomendasi Sehat
        </h3>
        {loading ? (
          <p className="text-sm text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>Memuat rekomendasi...</p>
        ) : (
          <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            {getRekomendasi(lastMedicine)}
          </p>
        )}
        {lastMedicine && (
          <p className="text-xs text-gray-400 mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
            Berdasarkan pembelian terakhir: <span className="font-medium text-[#5570F1]">{lastMedicine}</span>
          </p>
        )}
      </div>

      {/* Shortcut navigasi */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/member/katalog"
          className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:bg-[#eef1fe] transition">
          <LuPill className="text-[#5570F1] text-xl" />
          <span className="text-sm font-medium text-[#1C1D22]" style={{ fontFamily: "Inter, sans-serif" }}>
            Lihat Katalog Obat
          </span>
        </Link>
        <Link to="/member/riwayat"
          className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:bg-[#eef1fe] transition">
          <LuShoppingCart className="text-[#5570F1] text-xl" />
          <span className="text-sm font-medium text-[#1C1D22]" style={{ fontFamily: "Inter, sans-serif" }}>
            Riwayat Transaksi
          </span>
        </Link>
      </div>
    </div>
  );
}
