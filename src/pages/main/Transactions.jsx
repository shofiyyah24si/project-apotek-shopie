import { useState, useMemo } from "react";
import {
  FaChevronDown, FaSearch, FaFilter, FaShareAlt,
  FaPlus, FaChevronLeft, FaChevronRight,
} from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi2";
import transactionsRaw from "../../data/transactions.json";
import medicines from "../../data/medicines.json";
import patients  from "../../data/patients.json";
import TransactionBadge from "../../components/apotek/TransactionBadge";
import InputField from "../../components/apotek/InputField";

// ── shadcn/ui: Table ─────────────────────────────────────────
import {
  Table, TableHeader, TableBody,
  TableHead, TableRow, TableCell,
} from "@/components/ui/table";

// ── shadcn/ui: Dialog ────────────────────────────────────────
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";

// ── shadcn/ui: Select ────────────────────────────────────────
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";

const PAGE_SIZES = [10, 20, 50];

const enriched = transactionsRaw.map((t, i) => ({
  ...t,
  jenis: i % 2 === 0 ? "Ambil Langsung" : "Antar ke Rumah",
  displayTotal: `Rp ${t.total.toLocaleString("id-ID")}`,
}));

// ── Form Tambah Transaksi ────────────────────────────────────
function FormTambahTransaksi({ open, onOpenChange }) {
  const [form, setForm] = useState({
    patientId: "", medicineId: "", qty: 1, jenis: "Ambil Langsung",
  });

  const selectedMed = medicines.find(m => m.id === form.medicineId);
  const total = selectedMed ? selectedMed.price * form.qty : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buat Transaksi Baru</DialogTitle>
          <DialogDescription>Pilih pelanggan, obat, dan jumlah pembelian.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Pilih Pelanggan */}
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block" style={{ fontFamily: "Inter, sans-serif" }}>Pelanggan</label>
            <Select value={form.patientId} onValueChange={v => setForm(f => ({ ...f, patientId: v }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-- Pilih Pelanggan --" />
              </SelectTrigger>
              <SelectContent>
                {patients.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pilih Obat */}
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block" style={{ fontFamily: "Inter, sans-serif" }}>Obat</label>
            <Select value={form.medicineId} onValueChange={v => setForm(f => ({ ...f, medicineId: v }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-- Pilih Obat --" />
              </SelectTrigger>
              <SelectContent>
                {medicines.map(m => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name} — Rp {m.price.toLocaleString("id-ID")} (Stok: {m.stock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Jumlah */}
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block" style={{ fontFamily: "Inter, sans-serif" }}>Jumlah</label>
            <InputField name="qty" type="number" placeholder="Jumlah"
              value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} />
          </div>

          {/* Jenis Layanan */}
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block" style={{ fontFamily: "Inter, sans-serif" }}>Jenis Layanan</label>
            <Select value={form.jenis} onValueChange={v => setForm(f => ({ ...f, jenis: v }))}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ambil Langsung">Ambil Langsung</SelectItem>
                <SelectItem value="Antar ke Rumah">Antar ke Rumah</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preview total */}
          {total > 0 && (
            <div className="bg-[#eef1fe] rounded-xl px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>Total</span>
              <span className="text-sm font-bold text-[#5570F1]" style={{ fontFamily: "Poppins, sans-serif" }}>
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <button onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 text-sm text-[#5570F1] border border-[#5570F1] rounded-xl hover:bg-[#eef1fe] transition"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Batal
          </button>
          <button onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 bg-[#5570F1] hover:bg-[#4460e0] text-white text-sm rounded-xl transition"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Simpan
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Transactions() {
  const [search, setSearch]         = useState("");
  const [selected, setSelected]     = useState([]);
  const [pageSize, setPageSize]     = useState(10);
  const [page, setPage]             = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!search) return enriched;
    const q = search.toLowerCase();
    return enriched.filter(t =>
      t.patientName.toLowerCase().includes(q) ||
      t.medicine.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated  = filtered.slice((page - 1) * pageSize, page * pageSize);

  const allChecked = paginated.length > 0 && paginated.every(t => selected.includes(t.id));
  const toggleAll  = () => {
    if (allChecked) setSelected(s => s.filter(id => !paginated.find(t => t.id === id)));
    else setSelected(s => [...new Set([...s, ...paginated.map(t => t.id)])]);
  };
  const toggleOne = id =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
          Transaksi
        </h1>
        <div className="flex items-center gap-1.5 mt-1 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
          <HiOutlineHome className="text-base text-gray-400" />
          <span className="text-gray-400">/</span>
          <span className="text-[#5570F1] font-medium">Transaksi</span>
        </div>
      </div>

      {/* Tabel Transaksi */}
      <div className="mx-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Data Transaksi
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Cari transaksi..."
                className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none w-40 focus:w-52 transition-all"
                style={{ fontFamily: "Inter, sans-serif" }} />
            </div>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <FaFilter className="text-xs" /> Filter
            </button>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <FaShareAlt className="text-xs" /> Ekspor
            </button>
            {/* Tombol buka dialog tambah transaksi */}
            <button
              className="flex items-center gap-1.5 bg-[#5570F1] hover:bg-[#4460e0] text-white rounded-lg px-3 py-1.5 text-sm transition"
              style={{ fontFamily: "Inter, sans-serif" }}
              onClick={() => setDialogOpen(true)}>
              <FaPlus className="text-xs" /> Buat Transaksi
            </button>
          </div>
        </div>

        {/* shadcn Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 px-5">
                <input type="checkbox" checked={allChecked} onChange={toggleAll}
                  className="w-4 h-4 rounded border-gray-300 accent-[#5570F1]" />
              </TableHead>
              {["ID","Nama Pelanggan","Obat","Tanggal","Jenis","Qty","Total","Status"].map(h => (
                <TableHead key={h} className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  <span className="flex items-center gap-1">
                    {h} <FaChevronDown className="text-[9px] text-gray-300" />
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map(t => (
              <TableRow key={t.id}>
                <TableCell className="px-5">
                  <input type="checkbox" checked={selected.includes(t.id)}
                    onChange={() => toggleOne(t.id)}
                    className="w-4 h-4 rounded border-gray-300 accent-[#5570F1]" />
                </TableCell>
                <TableCell className="px-4 text-xs text-gray-400">{t.id}</TableCell>
                <TableCell className="px-4 font-medium text-[#1C1D22]">{t.patientName}</TableCell>
                <TableCell className="px-4 text-gray-500">{t.medicine}</TableCell>
                <TableCell className="px-4 text-gray-500">{t.date}</TableCell>
                <TableCell className="px-4 text-gray-500">{t.jenis}</TableCell>
                <TableCell className="px-4 text-gray-700">{t.qty}</TableCell>
                <TableCell className="px-4 font-medium text-[#1C1D22]">{t.displayTotal}</TableCell>
                <TableCell className="px-4">
                  <TransactionBadge type={t.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 text-sm text-gray-500">
          <div className="flex items-center gap-2" style={{ fontFamily: "Inter, sans-serif" }}>
            <select value={pageSize} onChange={e => { setPageSize(+e.target.value); setPage(1); }}
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none">
              {PAGE_SIZES.map(s => <option key={s}>{s}</option>)}
            </select>
            <span>Item per halaman</span>
            <span className="text-gray-400">
              {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} dari {filtered.length} item
            </span>
          </div>
          <div className="flex items-center gap-2" style={{ fontFamily: "Inter, sans-serif" }}>
            <span>{page} dari {totalPages} halaman</span>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40">
              <FaChevronLeft className="text-xs" />
            </button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40">
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Dialog form tambah transaksi */}
      <FormTambahTransaksi open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
