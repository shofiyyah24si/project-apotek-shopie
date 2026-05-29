import { useState } from "react";
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import PageHeader from "../../components/PageHeader";
import patientsData from "../../data/patients.json";

// ── Reusable apotek components ──────────────────────────────
import AppButton   from "../../components/apotek/AppButton";
import InputField  from "../../components/apotek/InputField";
import FormActions from "../../components/apotek/FormActions";
import MembershipBadge from "../../components/apotek/MembershipBadge";

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

export default function Patients() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", dob: "", address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const filtered = patientsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* ── Tombol trigger Dialog ── */}
      <PageHeader title="Data Pasien" breadcrumb={["Dashboard", "Data Pasien"]}>
        <AppButton onClick={() => setOpen(true)}>+ Tambah Pasien</AppButton>
      </PageHeader>

      {/* ── shadcn Table: daftar pasien ── */}
      <div className="mx-4 bg-white rounded-2xl shadow-sm overflow-x-auto">

        {/* Search bar */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="relative max-w-xs">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, ID, atau kota..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#5570F1] transition"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {["ID", "Nama", "Level", "Total Transaksi", "Email", "No. HP", "Tgl Lahir", "Alamat"].map((h) => (
                <TableHead key={h} className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-4">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="px-5 py-3.5 text-xs text-gray-400 font-medium">
                  {p.id}
                </TableCell>
                <TableCell className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#eef1fe] text-[#5570F1] flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {p.name.charAt(0)}
                    </div>
                    <Link to={`/patients/${p.id}`}
                      className="font-medium text-[#5570F1] hover:underline text-sm">
                      {p.name}
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-3.5">
                  <MembershipBadge level={p.levelMembership} />
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm text-gray-700 font-medium">
                  {p.totalTransaksi}x
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm text-gray-500">{p.email}</TableCell>
                <TableCell className="px-5 py-3.5 text-sm text-gray-600">{p.phone}</TableCell>
                <TableCell className="px-5 py-3.5 text-xs text-gray-400">{p.dob}</TableCell>
                <TableCell className="px-5 py-3.5 text-xs text-gray-400 max-w-xs truncate">{p.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ── shadcn Dialog: form tambah pasien ── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Pasien Baru</DialogTitle>
            <DialogDescription>Isi informasi pasien dengan lengkap.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <InputField name="name"    placeholder="Nama Pasien"   value={form.name}    onChange={handleChange} />
            <InputField name="email"   type="email" placeholder="Email Pasien"  value={form.email}   onChange={handleChange} />
            <InputField name="phone"   placeholder="No. HP"        value={form.phone}   onChange={handleChange} />
            <InputField name="dob"     type="date"  placeholder="Tgl Lahir"     value={form.dob}     onChange={handleChange} />
            <InputField name="address" placeholder="Alamat"        value={form.address} onChange={handleChange} />
          </div>
          <DialogFooter>
            <FormActions
              onCancel={() => setOpen(false)}
              onSubmit={() => setOpen(false)}
              submitLabel="Tambah"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
