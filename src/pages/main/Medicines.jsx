import { useState } from "react";
import { FaPills } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import medicinesData from "../../data/medicines.json";

// ── Reusable apotek components ──────────────────────────────
import AppButton    from "../../components/apotek/AppButton";
import AppBadge     from "../../components/apotek/AppBadge";
import AppAvatar    from "../../components/apotek/AppAvatar";
import AppCard      from "../../components/apotek/AppCard";
import AppContainer from "../../components/apotek/AppContainer";
import StockBadge   from "../../components/apotek/StockBadge";
import PriceDisplay from "../../components/apotek/PriceDisplay";
import InputField   from "../../components/apotek/InputField";
import SectionTitle from "../../components/apotek/SectionTitle";
import FormActions  from "../../components/apotek/FormActions";

// ── shadcn/ui: Table ─────────────────────────────────────────
import {
  Table, TableHeader, TableBody,
  TableHead, TableRow, TableCell,
} from "@/components/ui/table";

// ── shadcn/ui: Dialog ────────────────────────────────────────
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";

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

const FORM_FIELDS = [
  { name: "name",     placeholder: "Nama Obat",  type: "text"   },
  { name: "category", placeholder: "Kategori",   type: "text"   },
  { name: "stock",    placeholder: "Stok",       type: "number" },
  { name: "price",    placeholder: "Harga (Rp)", type: "number" },
  { name: "expiry",   placeholder: "Kadaluarsa", type: "date"   },
];

export default function Medicines() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", category: "", stock: "", price: "", expiry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      {/* ── Tombol trigger Dialog — pakai AppButton dengan onClick ── */}
      <PageHeader title="Data Obat" breadcrumb={["Dashboard", "Data Obat"]}>
        <AppButton onClick={() => setOpen(true)}>+ Tambah Obat</AppButton>
      </PageHeader>

      <AppContainer>
        {/* Operational CRM: alert stok kritis — admin segera ambil tindakan */}
        {(() => {
          const kritis = medicinesData.filter(m => m.stock > 0 && m.stock < 50);
          const habis  = medicinesData.filter(m => m.stock === 0);
          if (kritis.length === 0 && habis.length === 0) return null;
          return (
            <div className="mb-4 flex flex-wrap gap-3">
              {habis.length > 0 && (
                <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                    {habis.length} obat <strong>habis</strong>: {habis.map(m => m.name).join(", ")}
                  </p>
                </div>
              )}
              {kritis.length > 0 && (
                <div className="flex items-center gap-2.5 bg-orange-50 border border-orange-200 rounded-xl px-4 py-2.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                  <p className="text-sm text-orange-600 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                    {kritis.length} obat stok <strong>kritis</strong> (&lt;50 unit) — segera restock
                  </p>
                </div>
              )}
            </div>
          );
        })()}
        <AppCard className="overflow-x-auto">
          {medicinesData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <FaPills className="text-5xl mb-3 text-gray-300" />
              <p className="text-sm">Belum ada data obat</p>
            </div>
          ) : (
            // ── shadcn Table: menampilkan daftar obat ──
            <Table>
              <TableHeader>
                <TableRow>
                  {["ID", "Nama Obat", "Kategori", "Stok", "Harga", "Kadaluarsa"].map((h) => (
                    <TableHead key={h} className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-4">
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicinesData.map((med) => (
                  <TableRow key={med.id}>
                    <TableCell className="px-5 py-3.5 text-xs text-gray-400 font-medium">
                      {med.id}
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <a href={`/medicines/${med.id}`}
                        className="text-[#5570F1] hover:underline font-medium text-sm">
                        {med.name}
                      </a>
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <AppBadge className={categoryColor[med.category] || "bg-gray-100 text-gray-600"}>
                        {med.category}
                      </AppBadge>
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <StockBadge stock={med.stock} />
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <PriceDisplay amount={med.price} />
                    </TableCell>
                    <TableCell className="px-5 py-3.5 text-xs text-gray-400">
                      {med.expiry}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </AppCard>
      </AppContainer>

      {/* ── shadcn Dialog: form tambah obat ── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Obat Baru</DialogTitle>
            <DialogDescription>Isi informasi obat dengan lengkap.</DialogDescription>
          </DialogHeader>

          {/* Preview nama + kategori saat user mengetik */}
          {form.name && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <AppAvatar name={form.name} size="md" />
              <span className="text-sm text-gray-600">{form.name}</span>
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
            <div className="px-3 py-2 bg-[#eef1fe] rounded-xl flex items-center gap-2">
              <span className="text-xs text-gray-500">Preview harga:</span>
              <PriceDisplay amount={Number(form.price)} className="text-[#5570F1]" />
            </div>
          )}

          <DialogFooter className="gap-2">
            <FormActions
              onCancel={() => setOpen(false)}
              onSubmit={() => setOpen(false)}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
