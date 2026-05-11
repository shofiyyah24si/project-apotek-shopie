import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import patientsData from "../../data/patients.json";

export default function Patients() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", dob: "", address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <PageHeader title="Data Pasien" breadcrumb={["Dashboard", "Data Pasien"]}>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#5570F1] hover:bg-[#4460e0] text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          + Tambah Pasien
        </button>
      </PageHeader>

      <div className="mx-4 bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100">
            <tr>
              {["ID", "Nama", "Email", "No. HP", "Tgl Lahir", "Alamat"].map((h) => (
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
            {patientsData.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 font-medium text-gray-400 text-xs"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {p.id}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#eef1fe] text-[#5570F1] flex items-center justify-center font-bold text-xs flex-shrink-0"
                      style={{ fontFamily: "Poppins, sans-serif" }}>
                      {p.name.charAt(0)}
                    </div>
                    <Link
                      to={`/patients/${p.id}`}
                      className="font-medium text-[#5570F1] hover:text-[#4460e0] hover:underline"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {p.name}
                    </Link>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-gray-500"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {p.email}
                </td>
                <td className="px-5 py-3.5 text-gray-600"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {p.phone}
                </td>
                <td className="px-5 py-3.5 text-gray-400 text-xs"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {p.dob}
                </td>
                <td className="px-5 py-3.5 text-gray-400 text-xs max-w-xs truncate"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {p.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Pasien — sesuai referensi Metrix */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-1">
              <h2
                className="text-lg font-semibold text-[#1C1D22]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Tambah Pasien Baru
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-5"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Informasi Pasien
            </p>
            <div className="space-y-3">
              <input
                name="name" placeholder="Nama Pasien" value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-[#5570F1] transition"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
              <input
                name="email" type="email" placeholder="Email Pasien" value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-[#5570F1] transition"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
              <input
                name="phone" placeholder="No. HP" value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-[#5570F1] transition"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
              <input
                name="dob" type="date" value={form.dob}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-[#5570F1] transition"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
              <input
                name="address" placeholder="Alamat" value={form.address}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-[#5570F1] transition"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 text-sm text-[#5570F1] border border-[#5570F1] rounded-xl hover:bg-[#eef1fe] transition"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Batal
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 bg-[#5570F1] hover:bg-[#4460e0] text-white text-sm rounded-xl transition"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}