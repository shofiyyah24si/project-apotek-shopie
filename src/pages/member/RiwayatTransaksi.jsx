import { useState, useEffect } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { transactionAPI } from "../../services/userAPI";
import TransactionBadge from "../../components/apotek/TransactionBadge";

// ── shadcn/ui: Table ──────────────────────────────────────────
import {
  Table, TableHeader, TableBody,
  TableHead, TableRow, TableCell,
} from "@/components/ui/table";

export default function RiwayatTransaksi() {
  // Ambil session user dari localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");

  // useEffect: load transaksi milik user ini saat halaman dibuka
  useEffect(() => {
    if (user.id) loadTransaksi();
  }, []);

  const loadTransaksi = async () => {
    try {
      setLoading(true);
      setError("");
      // CRM Analitis: filter transaksi berdasarkan user_id — hanya lihat milik sendiri
      const data = await transactionAPI.fetchByUser(user.id);
      setTransactions(data);
    } catch (err) {
      setError("Gagal memuat riwayat transaksi");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPengeluaran = transactions.reduce((s, t) => s + (t.total || 0), 0);

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
          Riwayat Transaksi
        </h1>
        <p className="text-sm text-gray-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
          Hanya menampilkan transaksi milik akun Anda
        </p>
      </div>

      {/* Ringkasan */}
      {!loading && transactions.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
              Total Transaksi
            </p>
            <p className="text-2xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
              {transactions.length}x
            </p>
          </div>
          <div className="bg-[#5570F1] rounded-2xl p-4 text-white">
            <p className="text-xs text-[#bbcafb] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
              Total Pengeluaran
            </p>
            <p className="text-xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
              Rp {totalPengeluaran.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-[#CC5F5F] text-sm px-4 py-3 rounded-xl"
          style={{ fontFamily: "Inter, sans-serif" }}>
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-12 text-[#5570F1] text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#5570F1]" />
            Memuat riwayat transaksi...
          </div>
        )}

        {/* Empty */}
        {!loading && transactions.length === 0 && !error && (
          <div className="py-16 text-center text-gray-400"
            style={{ fontFamily: "Inter, sans-serif" }}>
            <LuShoppingCart className="text-4xl mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Belum ada transaksi. Mulai belanja dari Katalog Obat.</p>
          </div>
        )}

        {/* Table */}
        {!loading && transactions.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                {["#", "Nama Obat", "Qty", "Total", "Status", "Tanggal"].map(h => (
                  <TableHead key={h} className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t, i) => (
                <TableRow key={t.id}>
                  <TableCell className="px-5 py-3.5 text-xs text-gray-400">{i + 1}</TableCell>
                  <TableCell className="px-5 py-3.5 font-medium text-[#1C1D22] text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    {t.medicine}
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    {t.qty}x
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-sm font-medium text-[#1C1D22]"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    Rp {(t.total || 0).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-5 py-3.5">
                    <TransactionBadge type={t.status} />
                  </TableCell>
                  <TableCell className="px-5 py-3.5 text-xs text-gray-400"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    {t.date || t.created_at?.split("T")[0]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
