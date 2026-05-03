import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import medicinesData from "../../data/medicines.json";

export default function Medicines() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", stock: "", price: "", expiry: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <PageHeader title="Data Obat" breadcrumb={["Dashboard", "Data Obat"]}>
        <button onClick={() => setShowForm(true)} className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm">
          + Tambah Obat
        </button>
      </PageHeader>

      <div className="mx-4 bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["ID", "Nama Obat", "Kategori", "Stok", "Harga", "Kadaluarsa"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {medicinesData.map((med) => (
              <tr key={med.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-700">{med.id}</td>
                <td className="px-4 py-3 text-gray-800 font-medium">{med.name}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-700">
                    {med.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{med.stock}</td>
                <td className="px-4 py-3 text-gray-700">Rp {med.price.toLocaleString("id-ID")}</td>
                <td className="px-4 py-3 text-gray-500">{med.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">Tambah Obat</h2>
            <div className="space-y-3">
              <input name="name" placeholder="Nama Obat" value={form.name}
                onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none" />
              <input name="category" placeholder="Kategori" value={form.category}
                onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none" />
              <input name="stock" type="number" placeholder="Stok" value={form.stock}
                onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none" />
              <input name="price" type="number" placeholder="Harga (Rp)" value={form.price}
                onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none" />
              <input name="expiry" type="date" value={form.expiry}
                onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">Batal</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
