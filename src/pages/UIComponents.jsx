import { useState } from "react";
import PageHeader from "../components/PageHeader";

import AppButton        from "../components/apotek/AppButton";
import AppBadge         from "../components/apotek/AppBadge";
import AppAvatar        from "../components/apotek/AppAvatar";
import AppCard          from "../components/apotek/AppCard";
import AppContainer     from "../components/apotek/AppContainer";
import AppTable         from "../components/apotek/AppTable";
import AppTableRow      from "../components/apotek/AppTableRow";
import StockBadge       from "../components/apotek/StockBadge";
import PriceDisplay     from "../components/apotek/PriceDisplay";
import InputField       from "../components/apotek/InputField";
import AppModal         from "../components/apotek/AppModal";
import SectionTitle     from "../components/apotek/SectionTitle";
import MedicineTableRow from "../components/apotek/MedicineTableRow";
import FormActions      from "../components/apotek/FormActions";
import TransactionBadge from "../components/apotek/TransactionBadge";

const categoryColor = {
  "Analgesik":  "bg-[#eef1fe] text-[#5570F1]",
  "Antibiotik": "bg-red-100 text-red-700",
  "Vitamin":    "bg-green-100 text-[#519C66]",
};

const sampleMeds = [
  { id: "MED-001", name: "Paracetamol 500mg", category: "Analgesik",  stock: 250, price: 5000,   expiry: "2026-12-01" },
  { id: "MED-002", name: "Amoxicillin 500mg", category: "Antibiotik", stock: 30,  price: 8500,   expiry: "2026-08-15" },
  { id: "MED-003", name: "Vitamin C 1000mg",  category: "Vitamin",    stock: 0,   price: 185000, expiry: "2027-06-01" },
];

function Section({ title, desc, children }) {
  return (
    <AppCard className="p-6">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest pb-2 border-b border-gray-100"
        style={{ fontFamily: "Inter, sans-serif" }}>
        {title}
      </h3>
      {desc && (
        <p className="text-xs text-gray-400 mt-2 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
          {desc}
        </p>
      )}
      <div className="mt-4">{children}</div>
    </AppCard>
  );
}

export default function UIComponents() {
  const [inputVal, setInputVal]   = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <PageHeader title="UI Components" breadcrumb={["Dashboard", "UI Components"]} />

      <AppContainer className="space-y-5 pb-8">

        {/* 1 */}
        <Section title="1. AppButton — Basic Component"
          desc="Tombol reusable dengan 5 variant warna. Tinggal ganti prop 'type' untuk ubah tampilan.">
          <div className="flex flex-wrap gap-2">
            <AppButton type="primary">Primary</AppButton>
            <AppButton type="secondary">Secondary</AppButton>
            <AppButton type="danger">Danger</AppButton>
            <AppButton type="warning">Warning</AppButton>
            <AppButton type="ghost">Ghost</AppButton>
          </div>
        </Section>

        {/* 2 */}
        <Section title="2. AppBadge — Basic Component"
          desc="Label kecil untuk kategori atau status. Warna diatur dari luar lewat prop 'className'.">
          <div className="flex flex-wrap gap-2">
            <AppBadge className="bg-[#eef1fe] text-[#5570F1]">Analgesik</AppBadge>
            <AppBadge className="bg-red-100 text-red-700">Antibiotik</AppBadge>
            <AppBadge className="bg-yellow-100 text-yellow-700">Antasida</AppBadge>
            <AppBadge className="bg-purple-100 text-purple-700">Antihistamin</AppBadge>
            <AppBadge className="bg-green-100 text-green-700">Vitamin</AppBadge>
            <AppBadge className="bg-orange-100 text-orange-700">Bronkodilator</AppBadge>
          </div>
        </Section>

        {/* 3 */}
        <Section title="3. AppAvatar — Basic Component"
          desc="Menampilkan inisial huruf pertama nama. Tersedia 3 ukuran: sm, md, lg.">
          <div className="flex items-end gap-6">
            {["sm", "md", "lg"].map((s) => (
              <div key={s} className="flex flex-col items-center gap-1">
                <AppAvatar name="Paracetamol" size={s} />
                <span className="text-xs text-gray-400">{s}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* 4 */}
        <Section title="4. AppCard — Layout Component"
          desc="Wrapper card putih dengan shadow dan rounded corner. Semua section di halaman ini pakai AppCard.">
          <AppCard className="p-4 border border-dashed border-gray-200">
            <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
              Ini konten di dalam AppCard. Bisa diisi apa saja.
            </p>
          </AppCard>
        </Section>

        {/* 5 */}
        <Section title="5. AppContainer — Layout Component"
          desc="Wrapper dengan margin konsisten. Dipakai di semua halaman sebagai pembungkus konten utama.">
          <div className="bg-gray-50 rounded-xl p-3 border border-dashed border-gray-200">
            <AppContainer className="bg-[#eef1fe] rounded-lg py-3">
              <p className="text-xs text-[#5570F1]" style={{ fontFamily: "Inter, sans-serif" }}>
                Konten di dalam AppContainer
              </p>
            </AppContainer>
          </div>
        </Section>

        {/* 6 */}
        <Section title="6. SectionTitle — Layout Component"
          desc="Judul besar + subjudul kecil. Dipakai di dalam modal form tambah obat.">
          <SectionTitle title="Tambah Obat Baru" subtitle="Isi informasi obat dengan lengkap" />
        </Section>

        {/* 7 & 8 */}
        <Section title="7 & 8. AppTable + AppTableRow — Data Display Component"
          desc="AppTable membuat struktur tabel dengan header dinamis. AppTableRow membuat baris dengan efek hover.">
          <AppTable headers={["Nama", "Kategori", "Harga"]}>
            <AppTableRow>
              <td className="px-5 py-3 text-sm text-gray-700">Paracetamol 500mg</td>
              <td className="px-5 py-3"><AppBadge className="bg-[#eef1fe] text-[#5570F1]">Analgesik</AppBadge></td>
              <td className="px-5 py-3"><PriceDisplay amount={5000} /></td>
            </AppTableRow>
            <AppTableRow>
              <td className="px-5 py-3 text-sm text-gray-700">Amoxicillin 500mg</td>
              <td className="px-5 py-3"><AppBadge className="bg-red-100 text-red-700">Antibiotik</AppBadge></td>
              <td className="px-5 py-3"><PriceDisplay amount={8500} /></td>
            </AppTableRow>
          </AppTable>
        </Section>

        {/* 9 */}
        <Section title="9. MedicineTableRow — Data Display Component"
          desc="Baris tabel lengkap khusus data obat. Sudah include AppBadge, StockBadge, dan PriceDisplay di dalamnya.">
          <AppTable headers={["ID", "Nama Obat", "Kategori", "Stok", "Harga", "Kadaluarsa"]}>
            {sampleMeds.map((med) => (
              <MedicineTableRow key={med.id} med={med} categoryColor={categoryColor} />
            ))}
          </AppTable>
        </Section>

        {/* 10 */}
        <Section title="10. PriceDisplay — Data Display Component"
          desc="Format harga otomatis ke Rupiah Indonesia. Tidak perlu tulis toLocaleString berulang-ulang.">
          <div className="flex flex-wrap gap-6">
            <PriceDisplay amount={5000} />
            <PriceDisplay amount={185000} />
            <PriceDisplay amount={1250000} />
          </div>
        </Section>

        {/* 11 */}
        <Section title="11. StockBadge — Data Display Component"
          desc="Tampilan stok dengan 3 kondisi otomatis: normal (hitam), rendah/kurang 50 (oranye), habis/0 (merah).">
          <div className="flex flex-wrap gap-8 items-center">
            {[{ stock: 250, label: "Normal" }, { stock: 30, label: "Rendah" }, { stock: 0, label: "Habis" }].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <StockBadge stock={s.stock} />
                <span className="text-xs text-gray-400">{s.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* 12 */}
        <Section title="12. InputField — Form Component"
          desc="Input form reusable. Satu komponen untuk semua jenis input: text, number, date.">
          <div className="space-y-2 max-w-sm">
            <InputField name="demo"   placeholder="Nama Obat"  value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            <InputField name="harga"  type="number" placeholder="Harga (Rp)"  value="" onChange={() => {}} />
            <InputField name="expiry" type="date"   placeholder="Kadaluarsa"  value="" onChange={() => {}} />
          </div>
        </Section>

        {/* 13 */}
        <Section title="13. FormActions — Form Component"
          desc="Pasangan tombol Batal dan Simpan untuk form. Tinggal kirim fungsi onCancel dan onSubmit.">
          <FormActions onCancel={() => {}} onSubmit={() => {}} />
        </Section>

        {/* 14 */}
        <Section title="14. TransactionBadge — Basic Component"
          desc="Badge status transaksi. Satu komponen, 3 tampilan berbeda otomatis sesuai data. Dipakai di halaman Transaksi dan Dashboard.">
          <div className="space-y-2">
            <p className="text-xs text-gray-400 font-mono" style={{ fontFamily: "Inter, sans-serif" }}>
            </p>
            <div className="flex flex-wrap gap-2">
              <TransactionBadge type="Selesai" />
              <TransactionBadge type="Diproses" />
              <TransactionBadge type="Dibatalkan" />
            </div>
          </div>
        </Section>

        {/* 15 */}
        <Section title="15. AppModal — Feedback Component"
          desc="Overlay modal yang bisa ditutup dengan klik di luar. Dipakai di form Tambah Obat dan Tambah Pasien.">
          <AppButton onClick={() => setShowModal(true)}>Buka Modal</AppButton>
          <p className="text-xs text-gray-400 mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
            Klik tombol di atas untuk lihat modal asli dengan overlay gelap
          </p>
          <AppModal show={showModal} onClose={() => setShowModal(false)}>
            <SectionTitle title="Contoh Modal" subtitle="Ini tampilan modal asli dengan overlay" />
            <InputField name="preview" placeholder="Nama Obat" value="" onChange={() => {}} />
            <FormActions onCancel={() => setShowModal(false)} onSubmit={() => setShowModal(false)} />
          </AppModal>
        </Section>

      </AppContainer>
    </div>
  );
}
