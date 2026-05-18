import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import patientsData from "../../data/patients.json";
import AppButton   from "../../components/apotek/AppButton";
import AppTable    from "../../components/apotek/AppTable";
import AppModal    from "../../components/apotek/AppModal";
import SectionTitle from "../../components/apotek/SectionTitle";
import InputField  from "../../components/apotek/InputField";
import FormActions from "../../components/apotek/FormActions";

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
        <AppButton onClick={() => setShowForm(true)}>+ Tambah Pasien</AppButton>
      </PageHeader>

      <div className="mx-4 bg-white rounded-2xl shadow-sm overflow-x-auto">
        <AppTable headers={["ID", "Nama", "Email", "No. HP", "Tgl Lahir", "Alamat"]}>
          {patientsData.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-5 py-3.5 font-medium text-gray-400 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{p.id}</td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#eef1fe] text-[#5570F1] flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {p.name.charAt(0)}
                  </div>
                  <Link to={`/patients/${p.id}`} className="font-medium text-[#5570F1] hover:underline" style={{ fontFamily: "Inter, sans-serif" }}>
                    {p.name}
                  </Link>
                </div>
              </td>
              <td className="px-5 py-3.5 text-gray-500 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{p.email}</td>
              <td className="px-5 py-3.5 text-gray-600 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{p.phone}</td>
              <td className="px-5 py-3.5 text-gray-400 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{p.dob}</td>
              <td className="px-5 py-3.5 text-gray-400 text-xs max-w-xs truncate" style={{ fontFamily: "Inter, sans-serif" }}>{p.address}</td>
            </tr>
          ))}
        </AppTable>
      </div>

      <AppModal show={showForm} onClose={() => setShowForm(false)}>
        <SectionTitle title="Tambah Pasien Baru" subtitle="Informasi Pasien" />
        <div className="space-y-3">
          <InputField name="name"    placeholder="Nama Pasien" value={form.name}    onChange={handleChange} />
          <InputField name="email"   type="email" placeholder="Email Pasien" value={form.email}   onChange={handleChange} />
          <InputField name="phone"   placeholder="No. HP"      value={form.phone}   onChange={handleChange} />
          <InputField name="dob"     type="date"  placeholder="Tgl Lahir"    value={form.dob}     onChange={handleChange} />
          <InputField name="address" placeholder="Alamat"      value={form.address} onChange={handleChange} />
        </div>
        <FormActions onCancel={() => setShowForm(false)} onSubmit={() => setShowForm(false)} submitLabel="Tambah" />
      </AppModal>
    </div>
  );
}