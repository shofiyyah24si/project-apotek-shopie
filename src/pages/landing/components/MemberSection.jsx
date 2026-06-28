import { useState } from "react";
import { LuStar, LuCircleCheck, LuX } from "react-icons/lu";

// ── Data tiering loyalty ─────────────────────────────────────
const tiers = [
  { name: "Bronze",   poin: "0 – 100 Poin",    diskon: "5%",  color: "bg-orange-100 text-orange-700 border-orange-200",  dot: "bg-orange-400" },
  { name: "Silver",   poin: "101 – 500 Poin",  diskon: "10%", color: "bg-gray-100 text-gray-600 border-gray-200",         dot: "bg-gray-400" },
  { name: "Gold",     poin: "501 – 1000 Poin", diskon: "15%", color: "bg-yellow-100 text-yellow-700 border-yellow-200",   dot: "bg-yellow-400" },
  { name: "Platinum", poin: "> 1000 Poin",     diskon: "20%", color: "bg-purple-100 text-purple-700 border-purple-200",   dot: "bg-purple-400" },
];

export default function MemberSection() {
  const [form, setForm]       = useState({ nama: "", email: "", whatsapp: "" });
  const [success, setSuccess] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.nama || !form.email || !form.whatsapp) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    setLoading(true);

    // Simulasi CRM: simpan ke localStorage
    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem("crm_members") || "[]");
      existing.push({ ...form, joinedAt: new Date().toISOString() });
      localStorage.setItem("crm_members", JSON.stringify(existing));

      setSuccess(`Terima kasih ${form.nama}, pendaftaran CRM berhasil! Kode voucher telah dikirim ke WhatsApp Anda.`);
      setForm({ nama: "", email: "", whatsapp: "" });
      setLoading(false);

      // Hilangkan notifikasi setelah 6 detik
      setTimeout(() => setSuccess(""), 6000);
    }, 800);
  };

  return (
    <section id="member" className="bg-gradient-to-br from-[#5570F1] to-[#3a52d4] py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
            style={{ fontFamily: "Inter, sans-serif" }}>
            <LuStar className="text-yellow-300" /> Program Loyalitas Member
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Gabung Member & Dapatkan<br />
            <span className="text-yellow-300">Voucher Diskon 10%!</span>
          </h2>
          <p className="text-white/70 text-sm mt-2 max-w-md mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Daftarkan diri Anda sekarang dan nikmati berbagai keuntungan eksklusif member Apotek Shopie.
          </p>
        </div>

        {/* ── Grid Tiering Loyalty ───────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {tiers.map(t => (
            <div key={t.name}
              className={`bg-white rounded-2xl p-4 border text-center shadow-sm ${t.color}`}>
              <div className={`w-3 h-3 rounded-full ${t.dot} mx-auto mb-2`} />
              <p className="font-bold text-sm mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                {t.name}
              </p>
              <p className="text-xs opacity-70 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                {t.poin}
              </p>
              <span className="text-lg font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                -{t.diskon}
              </span>
              <p className="text-[10px] opacity-60 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                potongan belanja
              </p>
            </div>
          ))}
        </div>

        {/* ── Form Pendaftaran CRM ──────────────────────────── */}
        <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg mx-auto shadow-2xl">
          <h3 className="font-bold text-[#1C1D22] text-lg mb-1"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Daftar Member Gratis
          </h3>
          <p className="text-sm text-gray-400 mb-5"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Isi form di bawah, voucher langsung dikirim ke WhatsApp Anda.
          </p>

          {/* Toast Success */}
          {success && (
            <div className="mb-4 flex items-start gap-2.5 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <LuCircleCheck className="flex-shrink-0 mt-0.5 text-green-600" />
              <span className="flex-1">{success}</span>
              <button onClick={() => setSuccess("")}>
                <LuX className="text-green-500 hover:text-green-700 flex-shrink-0" />
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl"
              style={{ fontFamily: "Inter, sans-serif" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="nama" type="text"
              value={form.nama} onChange={handleChange}
              disabled={loading}
              placeholder="Nama Lengkap"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5570F1] transition disabled:opacity-60"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <input
              name="email" type="email"
              value={form.email} onChange={handleChange}
              disabled={loading}
              placeholder="Alamat Email"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5570F1] transition disabled:opacity-60"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <input
              name="whatsapp" type="tel"
              value={form.whatsapp} onChange={handleChange}
              disabled={loading}
              placeholder="Nomor WhatsApp (08xxxxxxxx)"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#5570F1] transition disabled:opacity-60"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5570F1] hover:bg-[#4460e0] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition text-sm shadow-lg shadow-[#5570F1]/30 mt-1"
              style={{ fontFamily: "Inter, sans-serif" }}>
              {loading ? "Mendaftarkan..." : "🎁 Daftar Member & Klaim Voucher"}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-3"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Data Anda aman dan tidak akan disalahgunakan.
          </p>
        </div>
      </div>
    </section>
  );
}
