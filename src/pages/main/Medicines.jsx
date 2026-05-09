import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import medicinesData from "../../data/medicines.json";

const categoryColor = {
  "Analgesik": "bg-orange-100 text-orange-700",
  "Antibiotik": "bg-red-100 text-red-700",
  "Antasida": "bg-yellow-100 text-yellow-700",
  "Antihistamin": "bg-purple-100 text-purple-700",
  "Antidiabetik": "bg-blue-100 text-blue-700",
  "Antihipertensi": "bg-pink-100 text-pink-700",
  "Vitamin": "bg-green-100 text-green-700",
  "Bronkodilator": "bg-teal-100 text-teal-700",
};

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
        <button onClick={() => setShowForm(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition">
          + Tambah Obat
        </button>
      </PageHeader>

      <div className="mx-4 bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100">
            <tr>
              {["ID", "Nama Obat", "Kategori", "Stok", "Harga", "Kadaluarsa"].map((h) => (
                <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {medicinesData.map((med) => (
              <tr key={med.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 font-medium text-gray-500 text-xs">{med.id}</td>
                <td className="px-5 py-3.5">
                  <Link to={`/medicines/${med.id}`} className="text-teal-600 hover:text-teal-700 font-medium hover:underline">
                    {med.name}
                  </Link>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColor[med.category] || "bg-gray-100 text-gray-600"}`}>
                    {med.category}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`font-semibold ${med.stock < 50 ? "text-red-500" : "text-gray-700"}`}>
                    {med.stock}
                  </span>
                  {med.stock < 50 && <span className="ml-1 text-xs text-red-400">(Stok rendah)</span>}
                </td>
                <td className="px-5 py-3.5 text-gray-700 font-medium">Rp {med.price.toLocaleString("id-ID")}</td>
                <td className="px-5 py-3.5 text-gray-400 text-xs">{med.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-gray-800 mb-5">Tambah Obat</h2>
            <div className="space-y-3">
              <input name="name" placeholder="Nama Obat" value={form.name}
                onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-teal-500" />
              <input name="category" placeholder="Kategori" value={form.category}
                onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-teal-500" />
              <input name="stock" type="number" placeholder="Stok" value={form.stock}
                onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-teal-500" />
              <input name="price" type="number" placeholder="Harga (Rp)" value={form.price}
                onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-teal-500" />
              <input name="expiry" type="date" value={form.expiry}
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
