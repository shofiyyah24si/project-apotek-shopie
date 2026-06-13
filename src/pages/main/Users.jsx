import { useState, useEffect } from "react";
import { LuCircleAlert, LuCircleCheck, LuPencil, LuTrash2, LuUserPlus } from "react-icons/lu";
import { ImSpinner2 } from "react-icons/im";
import PageHeader from "../../components/PageHeader";
import { userAPI } from "../../services/userAPI";

// ── shadcn/ui: Table ──────────────────────────────────────────
import {
  Table, TableHeader, TableBody,
  TableHead, TableRow, TableCell,
} from "@/components/ui/table";

// ── shadcn/ui: Dialog ─────────────────────────────────────────
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";

const ROLE_OPTIONS = ["user", "admin"];

const emptyForm = { nama: "", email: "", password: "", role: "user" };

export default function Users() {
  const [users, setUsers]         = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");

  // Dialog tambah
  const [openAdd, setOpenAdd]     = useState(false);
  const [formAdd, setFormAdd]     = useState(emptyForm);

  // Dialog edit
  const [openEdit, setOpenEdit]   = useState(false);
  const [formEdit, setFormEdit]   = useState(emptyForm);
  const [editId, setEditId]       = useState(null);

  // useEffect: load user saat halaman dibuka
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userAPI.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat data user");
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  // ── CREATE ───────────────────────────────────────────────────
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formAdd.nama || !formAdd.email || !formAdd.password) {
      setError("Semua field wajib diisi"); return;
    }
    try {
      setLoading(true);
      setError("");
      await userAPI.createUser(formAdd);
      showSuccess("User berhasil ditambahkan");
      setOpenAdd(false);
      setFormAdd(emptyForm);
      loadUsers();
    } catch (err) {
      setError("Gagal menambah user");
    } finally {
      setLoading(false);
    }
  };

  // ── UPDATE ───────────────────────────────────────────────────
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formEdit.nama || !formEdit.email) {
      setError("Nama dan email wajib diisi"); return;
    }
    try {
      setLoading(true);
      setError("");
      await userAPI.updateUser(editId, {
        nama: formEdit.nama,
        email: formEdit.email,
        role: formEdit.role,
      });
      showSuccess("User berhasil diperbarui");
      setOpenEdit(false);
      loadUsers();
    } catch (err) {
      setError("Gagal memperbarui user");
    } finally {
      setLoading(false);
    }
  };

  // ── DELETE ───────────────────────────────────────────────────
  const handleDelete = async (id, nama) => {
    if (!confirm(`Yakin ingin menghapus user "${nama}"?`)) return;
    try {
      setLoading(true);
      setError("");
      await userAPI.deleteUser(id);
      showSuccess("User berhasil dihapus");
      loadUsers();
    } catch (err) {
      setError("Gagal menghapus user");
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (user) => {
    setEditId(user.id);
    setFormEdit({ nama: user.nama, email: user.email, role: user.role, password: "" });
    setOpenEdit(true);
  };

  return (
    <div>
      <PageHeader title="Manajemen User" breadcrumb={["Dashboard", "Users"]}>
        <button
          onClick={() => { setOpenAdd(true); setError(""); }}
          className="flex items-center gap-2 bg-[#5570F1] hover:bg-[#4460e0] text-white text-sm font-medium px-4 py-2 rounded-xl transition"
          style={{ fontFamily: "Inter, sans-serif" }}>
          <LuUserPlus /> Tambah User
        </button>
      </PageHeader>

      <div className="mx-4 space-y-4">

        {/* Alert */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl"
            style={{ fontFamily: "Inter, sans-serif" }}>
            <LuCircleAlert className="flex-shrink-0" /> {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl"
            style={{ fontFamily: "Inter, sans-serif" }}>
            <LuCircleCheck className="flex-shrink-0" /> {success}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          {/* Loading */}
          {loading && (
            <div className="flex items-center gap-2 justify-center py-10 text-[#5570F1]"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <ImSpinner2 className="animate-spin" /> Memuat data...
            </div>
          )}

          {/* Empty */}
          {!loading && users.length === 0 && !error && (
            <div className="py-16 text-center text-gray-400 text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Belum ada data user
            </div>
          )}

          {/* Table */}
          {!loading && users.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  {["ID", "Nama", "Email", "Role", "Tgl Daftar", "Aksi"].map(h => (
                    <TableHead key={h} className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                      style={{ fontFamily: "Inter, sans-serif" }}>
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(u => (
                  <TableRow key={u.id}>
                    <TableCell className="px-5 py-3.5 text-xs text-gray-400">{u.id}</TableCell>
                    <TableCell className="px-5 py-3.5 font-medium text-[#1C1D22] text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#eef1fe] text-[#5570F1] flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {u.nama?.charAt(0).toUpperCase()}
                        </div>
                        {u.nama}
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-3.5 text-sm text-gray-500">{u.email}</TableCell>
                    <TableCell className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-[#eef1fe] text-[#5570F1]"
                      }`} style={{ fontFamily: "Inter, sans-serif" }}>
                        {u.role}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-3.5 text-xs text-gray-400">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString("id-ID") : "—"}
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditDialog(u)}
                          className="p-1.5 text-[#5570F1] hover:bg-[#eef1fe] rounded-lg transition">
                          <LuPencil className="text-sm" />
                        </button>
                        <button onClick={() => handleDelete(u.id, u.nama)}
                          className="p-1.5 text-[#CC5F5F] hover:bg-red-50 rounded-lg transition">
                          <LuTrash2 className="text-sm" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* ── Dialog Tambah User ─────────────────────────────── */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah User Baru</DialogTitle>
            <DialogDescription>Isi data user yang akan ditambahkan.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-3">
            <input placeholder="Nama Lengkap" value={formAdd.nama} disabled={loading}
              onChange={e => setFormAdd({ ...formAdd, nama: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#5570F1] transition"
              style={{ fontFamily: "Inter, sans-serif" }} />
            <input type="email" placeholder="Email" value={formAdd.email} disabled={loading}
              onChange={e => setFormAdd({ ...formAdd, email: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#5570F1] transition"
              style={{ fontFamily: "Inter, sans-serif" }} />
            <input type="password" placeholder="Password" value={formAdd.password} disabled={loading}
              onChange={e => setFormAdd({ ...formAdd, password: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#5570F1] transition"
              style={{ fontFamily: "Inter, sans-serif" }} />
            <select value={formAdd.role} disabled={loading}
              onChange={e => setFormAdd({ ...formAdd, role: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#5570F1] transition bg-white"
              style={{ fontFamily: "Inter, sans-serif" }}>
              {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <DialogFooter className="gap-2 pt-2">
              <button type="button" onClick={() => setOpenAdd(false)}
                className="flex-1 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Batal
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 py-2.5 bg-[#5570F1] hover:bg-[#4460e0] text-white text-sm rounded-xl transition disabled:opacity-60"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Dialog Edit User ───────────────────────────────── */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Perbarui data user.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-3">
            <input placeholder="Nama Lengkap" value={formEdit.nama} disabled={loading}
              onChange={e => setFormEdit({ ...formEdit, nama: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#5570F1] transition"
              style={{ fontFamily: "Inter, sans-serif" }} />
            <input type="email" placeholder="Email" value={formEdit.email} disabled={loading}
              onChange={e => setFormEdit({ ...formEdit, email: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#5570F1] transition"
              style={{ fontFamily: "Inter, sans-serif" }} />
            <select value={formEdit.role} disabled={loading}
              onChange={e => setFormEdit({ ...formEdit, role: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#5570F1] transition bg-white"
              style={{ fontFamily: "Inter, sans-serif" }}>
              {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <DialogFooter className="gap-2 pt-2">
              <button type="button" onClick={() => setOpenEdit(false)}
                className="flex-1 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Batal
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 py-2.5 bg-[#5570F1] hover:bg-[#4460e0] text-white text-sm rounded-xl transition disabled:opacity-60"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
