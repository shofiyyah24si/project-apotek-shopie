import { useState, useMemo } from "react";
import {
  FaChevronDown, FaSearch, FaFilter, FaShareAlt,
  FaPlus, FaChevronLeft, FaChevronRight, FaTimes,
} from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi2";
import { LuClipboardList } from "react-icons/lu";
import { MdShoppingCart } from "react-icons/md";
import transactionsRaw from "../../data/transactions.json";
import medicines from "../../data/medicines.json";
import patients  from "../../data/patients.json";
import TransactionBadge from "../../components/apotek/TransactionBadge";

const PAGE_SIZES = [10, 20, 50];

const enriched = transactionsRaw.map((t, i) => ({
  ...t,
  jenis: i % 2 === 0 ? "Ambil Langsung" : "Antar ke Rumah",
  displayTotal: `Rp ${t.total.toLocaleString("id-ID")}`,
}));

function WeekBadge() {
  return (
    <button className="flex items-center gap-1 text-xs text-gray-400"
      style={{ fontFamily: "Inter, sans-serif" }}>
      Minggu Ini <FaChevronDown className="text-[10px]" />
    </button>
  );
}

function ModalTambahTransaksi({ onClose }) {
  const [form, setForm] = useState({
    patientId: "",
    medicineId: "",
    qty: 1,
    jenis: "Ambil Langsung",
    status: "Diproses",
  });

  const selectedMed = medicines.find(m => m.id === form.medicineId);
  const total = selectedMed ? selectedMed.price * form.qty : 0;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-lg font-semibold text-[#1C1D22]"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Buat Transaksi Baru
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">
            <FaTimes />
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
          Informasi Transaksi
        </p>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block" style={{ fontFamily: "Inter, sans-serif" }}>Pasien</label>
            <select name="patientId" value={form.patientId} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#5570F1] transition"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <option value="">-- Pilih Pasien --</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block" style={{ fontFamily: "Inter, sans-serif" }}>Obat</label>
            <select name="medicineId" value={form.medicineId} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#5570F1] transition"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <option value="">-- Pilih Obat --</option>
              {medicines.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} — Rp {m.price.toLocaleString("id-ID")} (Stok: {m.stock})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block" style={{ fontFamily: "Inter, sans-serif" }}>Jumlah</label>
            <input type="number" name="qty" min={1} value={form.qty} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#5570F1] transition"
              style={{ fontFamily: "Inter, sans-serif" }} />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block" style={{ fontFamily: "Inter, sans-serif" }}>Jenis Layanan</label>
            <select name="jenis" value={form.jenis} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#5570F1] transition"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <option>Ambil Langsung</option>
              <option>Antar ke Rumah</option>
            </select>
          </div>
          {total > 0 && (
            <div className="bg-[#eef1fe] rounded-xl px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>Total</span>
              <span className="text-sm font-bold text-[#5570F1]" style={{ fontFamily: "Poppins, sans-serif" }}>
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose}
            className="flex-1 py-2.5 text-sm text-[#5570F1] border border-[#5570F1] rounded-xl hover:bg-[#eef1fe] transition"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Batal
          </button>
          <button onClick={onClose}
            className="flex-1 py-2.5 bg-[#5570F1] hover:bg-[#4460e0] text-white text-sm rounded-xl transition"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Transactions() {
  const [search, setSearch]       = useState("");
  const [selected, setSelected]   = useState([]);
  const [pageSize, setPageSize]   = useState(10);
  const [page, setPage]           = useState(1);
  const [showModal, setShowModal] = useState(false);

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

  const semua      = enriched.length;
  const diproses   = enriched.filter(t => t.status === "Diproses").length;
  const selesai    = enriched.filter(t => t.status === "Selesai").length;
  const dibatalkan = enriched.filter(t => t.status === "Dibatalkan").length;
  const pendapatan = enriched.reduce((s, t) => s + t.total, 0);

  return (
    <div>
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

      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
          Ringkasan Transaksi
        </h2>
        <button className="flex items-center gap-2 bg-[#5570F1] text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-[#4460e0] transition"
          style={{ fontFamily: "Inter, sans-serif" }} onClick={() => setShowModal(true)}>
          <FaPlus className="text-xs" /> Buat Transaksi Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#eef1fe] flex items-center justify-center">
              <LuClipboardList className="text-[#5570F1] text-lg" />
            </div>
            <WeekBadge />
          </div>
          <div className="flex gap-6 flex-wrap">
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Semua</p>
              <p className="text-2xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>{semua}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Diproses</p>
              <p className="text-2xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>{diproses}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Selesai</p>
              <p className="text-2xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>{selesai}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#eef1fe] flex items-center justify-center">
              <LuClipboardList className="text-[#5570F1] text-lg" />
            </div>
            <WeekBadge />
          </div>
          <div className="flex gap-6 flex-wrap">
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Dibatalkan</p>
              <p className="text-2xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
                {dibatalkan} <span className="text-[#CC5F5F] text-sm font-normal">-20%</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Dikembalikan</p>
              <p className="text-2xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#eef1fe] flex items-center justify-center">
              <MdShoppingCart className="text-[#5570F1] text-lg" />
            </div>
            <WeekBadge />
          </div>
          <div className="flex gap-6 flex-wrap">
            <div>
              <p className="text-xs text-[#CC5F5F] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Total Pendapatan</p>
              <p className="text-xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
                Rp {pendapatan.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Data Transaksi Pasien
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
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Aksi Massal <FaChevronDown className="text-xs" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs">
                <th className="px-5 py-3 w-10">
                  <input type="checkbox" checked={allChecked} onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300 accent-[#5570F1]" />
                </th>
                {["ID","Nama Pasien","Obat","Tanggal","Jenis","Qty","Total","Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-medium whitespace-nowrap"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    <span className="flex items-center gap-1">
                      {h} <FaChevronDown className="text-[9px] text-gray-300" />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(t => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-5 py-3">
                    <input type="checkbox" checked={selected.includes(t.id)}
                      onChange={() => toggleOne(t.id)}
                      className="w-4 h-4 rounded border-gray-300 accent-[#5570F1]" />
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap"
                    style={{ fontFamily: "Inter, sans-serif" }}>{t.id}</td>
                  <td className="px-4 py-3 font-medium text-[#1C1D22] whitespace-nowrap"
                    style={{ fontFamily: "Inter, sans-serif" }}>{t.patientName}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap"
                    style={{ fontFamily: "Inter, sans-serif" }}>{t.medicine}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap"
                    style={{ fontFamily: "Inter, sans-serif" }}>{t.date}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap"
                    style={{ fontFamily: "Inter, sans-serif" }}>{t.jenis}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap"
                    style={{ fontFamily: "Inter, sans-serif" }}>{t.qty}</td>
                  <td className="px-4 py-3 font-medium text-[#1C1D22] whitespace-nowrap"
                    style={{ fontFamily: "Inter, sans-serif" }}>{t.displayTotal}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <TransactionBadge type={t.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

      {showModal && <ModalTambahTransaksi onClose={() => setShowModal(false)} />}
    </div>
  );
}
