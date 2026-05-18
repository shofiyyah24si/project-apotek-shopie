import { useState } from "react";
import { FaPills } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import medicinesData from "../../data/medicines.json";

// ── 15 Reusable Components ──────────────────────────────────
import AppButton       from "../../components/apotek/AppButton";
import AppBadge        from "../../components/apotek/AppBadge";
import AppAvatar       from "../../components/apotek/AppAvatar";
import AppCard         from "../../components/apotek/AppCard";
import AppContainer    from "../../components/apotek/AppContainer";
import AppTable        from "../../components/apotek/AppTable";
import AppTableRow     from "../../components/apotek/AppTableRow";
import StockBadge      from "../../components/apotek/StockBadge";
import PriceDisplay    from "../../components/apotek/PriceDisplay";
import InputField      from "../../components/apotek/InputField";
import AppModal        from "../../components/apotek/AppModal";
import SectionTitle    from "../../components/apotek/SectionTitle";
import MedicineTableRow from "../../components/apotek/MedicineTableRow";
import FormActions     from "../../components/apotek/FormActions";

const categoryColor = {
  "Analgesik":      "bg-[#eef1fe] text-[#5570F1]",
  "Antibiotik":     "bg-red-100 text-red-700",
  "Antasida":       "bg-yellow-100 text-yellow-700",
  "Antihistamin":   "bg-purple-100 text-purple-700",
  "Antidiabetik":   "bg-[#dde4fd] text-[#5570F1]",
  "Antihipertensi": "bg-pink-100 text-pink-700",
  "Vitamin":        "bg-green-100 text-[#519C66]",
  "Bronkodilator":  "bg-orange-100 text-orange-700",
};

const TABLE_HEADERS = ["ID", "Nama Obat", "Kategori", "Stok", "Harga", "Kadaluarsa"];

const FORM_FIELDS = [
  { name: "name",     placeholder: "Nama Obat",  type: "text"   },
  { name: "category", placeholder: "Kategori",   type: "text"   },
  { name: "stock",    placeholder: "Stok",       type: "number" },
  { name: "price",    placeholder: "Harga (Rp)", type: "number" },
  { name: "expiry",   placeholder: "Kadaluarsa", type: "date"   },
];

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
        {/* AppButton — Basic Component */}
        <AppButton onClick={() => setShowForm(true)}>
          + Tambah Obat
        </AppButton>
      </PageHeader>

    
      <AppContainer>
     
        <AppCard className="overflow-x-auto">
          {medicinesData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <FaPills className="text-5xl mb-3 text-gray-300" />
              <p className="text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Belum ada data obat</p>
            </div>
          ) : (

            <AppTable headers={TABLE_HEADERS}>
              {medicinesData.map((med) => (
             
                <MedicineTableRow
                  key={med.id}
                  med={med}
                  categoryColor={categoryColor}
                />
              ))}

            </AppTable>
          )}
        </AppCard>
      </AppContainer>

      <AppModal show={showForm} onClose={() => setShowForm(false)}>

        <SectionTitle title="Tambah Obat Baru" subtitle="Informasi Obat" />

        {form.name && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
            <AppAvatar name={form.name} size="md" />
            <span className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
              {form.name}
            </span>

            {form.category && (
              <AppBadge className={categoryColor[form.category] || "bg-gray-100 text-gray-600"}>
                {form.category}
              </AppBadge>
            )}
          </div>
        )}

        <div className="space-y-3">
          {FORM_FIELDS.map((f) => (
            <InputField
              key={f.name}
              name={f.name}
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.name]}
              onChange={handleChange}
            />
          ))}
        </div>

        {form.price && (
          <div className="mt-3 px-3 py-2 bg-[#eef1fe] rounded-xl flex items-center gap-2">
            <span className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
              Preview harga:
            </span>
  
            <PriceDisplay amount={Number(form.price)} className="text-[#5570F1]" />
          </div>
        )}

        <FormActions
          onCancel={() => setShowForm(false)}
          onSubmit={() => setShowForm(false)}
        />
      </AppModal>
    </div>
  );
}
