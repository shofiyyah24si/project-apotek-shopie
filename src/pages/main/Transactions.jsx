import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import transactionsData from "../../data/transactions.json";

const statusColor = {
  Selesai: "bg-green-100 text-green-700",
  Diproses: "bg-blue-100 text-blue-700",
  Dibatalkan: "bg-red-100 text-red-700",
};

export default function Transactions() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patientName: "", medicine: "", qty: "", status: "Diproses", date: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <PageHeader title="Transaksi" breadcrumb={["Dashboard", "Transaksi"]}>
        <button onClick={() => setShowForm(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition">
          + Tambah Transaksi
        </button>
      </PageHeader>

      <div className="mx-4 bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100">
            <tr>
              {["ID", "Nama Pasien", "Obat", "Qty", "Status", "Total", "Tanggal"].map((h) => (
                <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {transactionsData.map((trx) => (
              <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 font-medium text-gray-700">{trx.id}</td>
                <td className="px-5 py-3.5 text-gray-700 font-medium">{trx.patientName}</td>
                <td className="px-5 py-3.5 text-gray-500 text-xs">{trx.medicine}</td>
                <td className="px-5 py-3.5 text-gray-600">{trx.qty}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[trx.status]}`}>
                    {trx.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-semibold text-gray-700">Rp {trx.total.toLocaleString("id-ID")}</td>
                <td className="px-5 py-3.5 text-gray-400 text-xs">{trx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-gray-800 mb-5">Tambah Transaksi</h2>
            <div className="space-y-3">
              <input name="patientName" placeholder="Nama Pasien" value={form.patientName}
                onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-teal-500" />
              <input name="medicine" placeholder="Nama Obat" value={form.medicine}
                onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-teal-500" />
              <input name="qty" type="number" placeholder="Jumlah" value={form.qty}
                onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-teal-500" />
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none bg-white focus:border-teal-500">
                <option>Diproses</option>
                <option>Selesai</option>
                <option>Dibatalkan</option>
              </select>
              <input name="date" type="date" value={form.date}
                onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-teal-500" />
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 rounded-xl">Batal</button>
              <button onClick={() => setShowForm(false)} className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-xl transition">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
