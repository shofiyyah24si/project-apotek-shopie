import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import patientsData from "../../data/patients.json";
import AppButton      from "../../components/apotek/AppButton";
import AppTable       from "../../components/apotek/AppTable";
import AppModal       from "../../components/apotek/AppModal";
import SectionTitle   from "../../components/apotek/SectionTitle";
import InputField     from "../../components/apotek/InputField";
import FormActions    from "../../components/apotek/FormActions";
import PatientTableRow from "../../components/apotek/PatientTableRow";

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
            <PatientTableRow key={p.id} patient={p} />
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