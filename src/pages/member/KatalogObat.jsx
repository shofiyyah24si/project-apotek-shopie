import { useState } from "react";
import { LuPill, LuX } from "react-icons/lu";
import medicinesData from "../../data/medicines.json";
import AppBadge    from "../../components/apotek/AppBadge";
import StockBadge  from "../../components/apotek/StockBadge";
import { transactionAPI, userAPI } from "../../services/userAPI";

// ── shadcn/ui: Table ──────────────────────────────────────────
import {
  Table, TableHeader, TableBody,
  TableHead, TableRow, TableCell,
} from "@/components/ui/table";

const categoryColor = {
  "Analgesik":      "bg-[#eef1fe] text-[#5570F1]",
  "Antibiotik":     "bg-red-100 text-red-700",
  "Antasida":       "bg-yellow-100 text-yellow-700",
  "Antihistamin":   "bg-purple-100 text-purple-700",
  "Antidiabetik":   "bg-[#dde4fd] text-[#5570F1]",
  "Antihipertensi": "bg-pink-100 text-pink-700",
  "Vitamin":        "bg-green-100 text-[#519C66]",
  "Bronkodilator":  "bg-orange-100 text-orange-700",
};

export default function KatalogObat() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [qty, setQty]           = useState({});
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState("");
  const [error, setError]       = useState("");
  const [detailObat, setDetailObat] = useState(null); // state modal detail

  const handleQtyChange = (id, val) => {
    setQty(prev => ({ ...prev, [id]: Math.max(1, parseInt(val) || 1) }));
  };

  // CRM Operasional: Simulasi Beli → simpan ke Supabase
  const handleBeli = async (med) => {
    const jumlah = qty[med.id] || 1;
    const total  = med.price * jumlah;
    setSuccess("");
    setError("");

    try {
      setLoading(true);
      await transactionAPI.createTransaction({
        user_id:  user.id,
        medicine: med.name,
        qty:      jumlah,
        total,
        status:   "Diproses",
      });

      // Hitung total transaksi terbaru lalu update level otomatis
      const semuaTrx = await transactionAPI.fetchByUser(user.id);
      const newLevel = await userAPI.updateLevel(user.id, semuaTrx.length);

      // Update localStorage agar sidebar langsung reflect level baru
      const updatedUser = { ...user, level: newLevel };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setSuccess(`Berhasil memesan ${jumlah}x ${med.name} — Total: Rp ${total.toLocaleString("id-ID")}${newLevel !== user.level ? ` 🎉 Level naik ke ${newLevel}!` : ""}`);
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError("Gagal memproses pesanan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
          Katalog Obat
        </h1>
        <p className="text-sm text-gray-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
          Lihat daftar obat dan lakukan simulasi pembelian
        </p>
      </div>

      {success && (
        <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl"
          style={{ fontFamily: "Inter, sans-serif" }}>
          ✅ {success}
        </div>
      )}
      {error && (
        <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-[#CC5F5F] text-sm px-4 py-3 rounded-xl"
          style={{ fontFamily: "Inter, sans-serif" }}>
          ❌ {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        {/* CRM Operasional: tombol + Tambah Obat TIDAK ditampilkan untuk member */}
        <Table>
          <TableHeader>
            <TableRow>
              {["Nama Obat", "Kategori", "Stok", "Harga", "Jumlah", "Aksi"].map(h => (
                <TableHead key={h} className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicinesData.map((med) => {
              const jumlah = qty[med.id] || 1;
              const total  = med.price * jumlah;
              return (
                <TableRow key={med.id}>
                  <TableCell className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#eef1fe] flex items-center justify-center flex-shrink-0">
                        <LuPill className="text-[#5570F1] text-sm" />
                      </div>
                      {/* Nama obat bisa diklik untuk lihat detail */}
                      <button
                        onClick={() => setDetailObat(med)}
                        className="text-sm font-medium text-[#5570F1] hover:underline text-left"
                        style={{ fontFamily: "Inter, sans-serif" }}>
                        {med.name}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-3.5">
                    <AppBadge className={categoryColor[med.category] || "bg-gray-100 text-gray-600"}>
                      {med.category}
                    </AppBadge>
                  </TableCell>
                  <TableCell className="px-5 py-3.5">
                    <StockBadge stock={med.stock} />
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-sm font-medium text-[#1C1D22]"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    Rp {med.price.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-5 py-3.5">
                    <input
                      type="number" min={1} max={med.stock}
                      value={jumlah}
                      onChange={e => handleQtyChange(med.id, e.target.value)}
                      disabled={med.stock === 0}
                      className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm text-center outline-none focus:border-[#5570F1] disabled:opacity-40"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </TableCell>
                  <TableCell className="px-5 py-3.5">
                    {/* CRM Operasional: tombol Simulasi Beli — otomatis hitung total */}
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => handleBeli(med)}
                        disabled={loading || med.stock === 0}
                        className="px-3 py-1.5 bg-[#5570F1] hover:bg-[#4460e0] disabled:opacity-40 text-white text-xs font-medium rounded-lg transition"
                        style={{ fontFamily: "Inter, sans-serif" }}>
                        {loading ? "..." : "Pesan Obat"}
                      </button>
                      <span className="text-[10px] text-gray-400 text-center"
                        style={{ fontFamily: "Inter, sans-serif" }}>
                        = Rp {total.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* ── Modal Detail Obat ──────────────────────────────── */}
      {detailObat && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setDetailObat(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}>

            {/* Gambar + header */}
            <div className="relative">
              {detailObat.image ? (
                <img src={detailObat.image} alt={detailObat.name}
                  className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-[#eef1fe] flex items-center justify-center">
                  <LuPill className="text-[#5570F1] text-5xl" />
                </div>
              )}
              <button onClick={() => setDetailObat(null)}
                className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-1.5 text-gray-600 shadow">
                <LuX className="text-sm" />
              </button>
            </div>

            {/* Konten */}
            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-[#1C1D22] text-lg leading-tight"
                    style={{ fontFamily: "Poppins, sans-serif" }}>
                    {detailObat.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    {detailObat.brand} · {detailObat.id}
                  </p>
                </div>
                <AppBadge className={categoryColor[detailObat.category] || "bg-gray-100 text-gray-600"}>
                  {detailObat.category}
                </AppBadge>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {detailObat.description}
              </p>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Harga", value: `Rp ${detailObat.price.toLocaleString("id-ID")}` },
                  { label: "Stok",  value: <StockBadge stock={detailObat.stock} /> },
                  { label: "Kadaluarsa", value: detailObat.expiry },
                  { label: "Produsen",   value: detailObat.manufacturer },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                      {item.label}
                    </p>
                    <div className="text-sm font-medium text-[#1C1D22]"
                      style={{ fontFamily: "Inter, sans-serif" }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {detailObat.dosage && (
                <div className="bg-[#eef1fe] rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>Dosis</p>
                  <p className="text-sm text-[#5570F1] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                    {detailObat.dosage}
                  </p>
                </div>
              )}

              <button onClick={() => setDetailObat(null)}
                className="w-full py-2.5 bg-[#5570F1] hover:bg-[#4460e0] text-white text-sm font-medium rounded-xl transition"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
