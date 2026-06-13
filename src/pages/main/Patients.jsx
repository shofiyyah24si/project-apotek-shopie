import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuSearch, LuTriangleAlert } from "react-icons/lu";
import PageHeader from "../../components/PageHeader";
import patientsData from "../../data/patients.json";

// ── Reusable apotek components ──────────────────────────────
import AppButton       from "../../components/apotek/AppButton";
import InputField      from "../../components/apotek/InputField";
import FormActions     from "../../components/apotek/FormActions";
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

// Strategic CRM: opsi filter level membership
const LEVEL_OPTIONS = ["Semua", "Platinum", "Gold", "Silver", "Bronze"];

export default function Patients() {
  const [open, setOpen]               = useState(false);
  const [search, setSearch]           = useState("");
  const [filterLevel, setFilterLevel] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");

  // useRef: referensi ke elemen input search tanpa menyebabkan re-render
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", dob: "", address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Filter: search + level + status aktif
  const filtered = patientsData.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      (p.city || "").toLowerCase().includes(search.toLowerCase());
    const matchLevel  = filterLevel === "Semua" || p.levelMembership === filterLevel;
    const matchStatus = filterStatus === "Semua" || p.statusMember === filterStatus;
    return matchSearch && matchLevel && matchStatus;
  });

  // Collaborative CRM: hitung pelanggan dengan komplain
  const adaKomplain = patientsData.filter(p => p.komplain && p.komplain !== "Tidak ada").length;
  // Strategic CRM: hitung tidak aktif
  const tidakAktif  = patientsData.filter(p => p.statusMember === "Tidak Aktif").length;

  return (
    <div>
      <PageHeader title="Data Pelanggan" breadcrumb={["Dashboard", "Data Pelanggan"]}>
        <AppButton onClick={() => setOpen(true)}>+ Tambah Pelanggan</AppButton>
      </PageHeader>

      <div className="mx-4 space-y-4">

        {/* ── Strategic & Collaborative CRM: ringkasan alert ── */}
        {(tidakAktif > 0 || adaKomplain > 0) && (
          <div className="flex flex-wrap gap-3">
            {tidakAktif > 0 && (
              <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-4 py-2.5">
                <LuTriangleAlert className="text-orange-500 text-sm flex-shrink-0" />
                {/* Strategic CRM: identifikasi pelanggan yang perlu reaktivasi */}
                <p className="text-sm text-orange-600 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  <strong>{tidakAktif}</strong> pelanggan tidak aktif — pertimbangkan program reaktivasi
                </p>
              </div>
            )}
            {adaKomplain > 0 && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                <LuTriangleAlert className="text-red-500 text-sm flex-shrink-0" />
                {/* Collaborative CRM: ada komplain yang perlu ditindaklanjuti */}
                <p className="text-sm text-red-600 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  <strong>{adaKomplain}</strong> pelanggan memiliki riwayat komplain — tindak lanjuti segera
                </p>
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">

          {/* Toolbar: search + filter */}
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center gap-3">

            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              {/* useRef: ref={searchRef} menghubungkan variabel searchRef ke elemen input ini */}
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama, ID, atau kota..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#5570F1] transition"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>

            {/* Strategic CRM: filter level membership */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {LEVEL_OPTIONS.map((lv) => (
                <button
                  key={lv}
                  onClick={() => setFilterLevel(lv)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
                    filterLevel === lv
                      ? "bg-[#5570F1] text-white border-[#5570F1]"
                      : "bg-white text-gray-500 border-gray-200 hover:bg-[#eef1fe] hover:text-[#5570F1]"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {lv}
                </button>
              ))}
            </div>

            {/* Strategic CRM: filter status aktif/tidak aktif */}
            <div className="flex items-center gap-1.5">
              {["Semua", "Aktif", "Tidak Aktif"].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
                    filterStatus === st
                      ? st === "Tidak Aktif"
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-[#519C66] text-white border-[#519C66]"
                      : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Jumlah hasil filter */}
            <p className="text-xs text-gray-400 ml-auto" style={{ fontFamily: "Inter, sans-serif" }}>
              {filtered.length} dari {patientsData.length} pelanggan
            </p>
          </div>

          {/* shadcn Table */}
          <Table>
            <TableHeader>
              <TableRow>
                {["ID", "Nama", "Status", "Level", "Transaksi", "Komplain", "Email", "No. HP", "Kota"].map((h) => (
                  <TableHead key={h} className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-4">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => {
                const isInactive = p.statusMember === "Tidak Aktif";
                const hasKomplain = p.komplain && p.komplain !== "Tidak ada";
                return (
                  // Strategic CRM: highlight baris pelanggan tidak aktif
                  <TableRow key={p.id} className={isInactive ? "bg-orange-50/40" : ""}>
                    <TableCell className="px-5 py-3.5 text-xs text-gray-400 font-medium">
                      {p.id}
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                          isInactive ? "bg-orange-100 text-orange-500" : "bg-[#eef1fe] text-[#5570F1]"
                        }`}>
                          {p.name.charAt(0)}
                        </div>
                        <Link to={`/customers/${p.id}`}
                          className="font-medium text-[#5570F1] hover:underline text-sm">
                          {p.name}
                        </Link>
                      </div>
                    </TableCell>
                    {/* Strategic CRM: status aktif/tidak aktif */}
                    <TableCell className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        isInactive
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                      }`} style={{ fontFamily: "Inter, sans-serif" }}>
                        {p.statusMember}
                      </span>
                    </TableCell>
                    {/* Analytical CRM: level membership */}
                    <TableCell className="px-5 py-3.5">
                      <MembershipBadge level={p.levelMembership} />
                    </TableCell>
                    {/* Analytical CRM: frekuensi transaksi */}
                    <TableCell className="px-5 py-3.5 text-sm text-gray-700 font-medium">
                      {p.totalTransaksi}x
                    </TableCell>
                    {/* Collaborative CRM: indikator ada/tidak komplain */}
                    <TableCell className="px-5 py-3.5">
                      {hasKomplain ? (
                        <span className="text-xs font-medium text-red-500 flex items-center gap-1">
                          <LuTriangleAlert className="text-xs" /> Ada
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="px-5 py-3.5 text-sm text-gray-500">{p.email}</TableCell>
                    <TableCell className="px-5 py-3.5 text-sm text-gray-600">{p.phone}</TableCell>
                    <TableCell className="px-5 py-3.5 text-xs text-gray-400">{p.city}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialog tambah pelanggan */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Pelanggan Baru</DialogTitle>
            <DialogDescription>Isi informasi pelanggan dengan lengkap.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <InputField name="name"    placeholder="Nama Pelanggan"  value={form.name}    onChange={handleChange} />
            <InputField name="email"   type="email" placeholder="Email" value={form.email}   onChange={handleChange} />
            <InputField name="phone"   placeholder="No. HP"           value={form.phone}   onChange={handleChange} />
            <InputField name="dob"     type="date"  placeholder="Tgl Lahir" value={form.dob} onChange={handleChange} />
            <InputField name="address" placeholder="Alamat"           value={form.address} onChange={handleChange} />
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
