import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import medicinesData from "../../data/medicines.json";

const categoryColor = {
  "Analgesik":     "bg-[#eef1fe] text-[#5570F1]",
  "Antibiotik":    "bg-red-100 text-red-700",
  "Antasida":      "bg-yellow-100 text-yellow-700",
  "Antihistamin":  "bg-purple-100 text-purple-700",
  "Antidiabetik":  "bg-[#dde4fd] text-[#5570F1]",
  "Antihipertensi":"bg-pink-100 text-pink-700",
  "Vitamin":       "bg-green-100 text-[#519C66]",
  "Bronkodilator": "bg-orange-100 text-orange-700",
};

export default function Medicines() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "", category: "", stock: "", price: "", expiry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <PageHeader title="Data Obat" breadcrumb={["Dashboard", "Data Obat"]}>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#5570F1] hover:bg-[#4460e0] text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          + Tambah Obat
        </button>
      </PageHeader>

      <div className="mx-4 bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100">
            <tr>
              {["ID", "Nama Obat", "Kategori", "Stok", "Harga", "Kadaluarsa"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {medicinesData.map((med) => (
              <tr key={med.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 font-medium text-gray-400 text-xs"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {med.id}
                </td>
                <td className="px-5 py-3.5">
                  <Link
                    to={`/medicines/${med.id}`}
                    className="text-[#5570F1] hover:text-[#4460e0] font-medium hover:underline"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {med.name}
                  </Link>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      categoryColor[med.category] || "bg-gray-100 text-gray-600"
                    }`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {med.category}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`font-semibold ${
                      med.stock === 0
                        ? "text-[#CC5F5F]"
                        : med.stock < 50
                        ? "text-orange-500"
                        : "text-[#1C1D22]"
                    }`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {med.stock === 0 ? "Habis" : med.stock}
                  </span>
                  {med.stock > 0 && med.stock < 50 && (
                    <span className="ml-1 text-xs text-orange-400"
                      style={{ fontFamily: "Inter, sans-serif" }}>
                      (Stok rendah)
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-[#1C1D22] font-medium"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  Rp {med.price.toLocaleString("id-ID")}
                </td>
                <td className="px-5 py-3.5 text-gray-400 text-xs"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {med.expiry}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Obat */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-lg font-semibold text-[#1C1D22] mb-1"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Tambah Obat Baru
            </h2>
            <p className="text-xs text-gray-400 mb-5"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Informasi Obat
            </p>
            <div className="space-y-3">
              {[
                { name: "name",     placeholder: "Nama Obat",    type: "text"   },
                { name: "category", placeholder: "Kategori",     type: "text"   },
                { name: "stock",    placeholder: "Stok",         type: "number" },
                { name: "price",    placeholder: "Harga (Rp)",   type: "number" },
                { name: "expiry",   placeholder: "Kadaluarsa",   type: "date"   },
              ].map(f => (
                <input
                  key={f.name}
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-[#5570F1] transition"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Batal
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-2 bg-[#5570F1] hover:bg-[#4460e0] text-white text-sm rounded-xl transition"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}