import { useState } from "react";
import { LuMessageSquare, LuCircleCheck, LuCircleAlert } from "react-icons/lu";
import { complaintAPI } from "../../services/userAPI";

export default function KomplainFeedback() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError]     = useState("");
  const [form, setForm]       = useState({ komplain: "", feedback: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // CRM Kolaboratif: submit komplain → insert ke Supabase → tampil di halaman admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.komplain.trim()) {
      setError("Kolom komplain wajib diisi");
      return;
    }

    try {
      setLoading(true);
      await complaintAPI.submitComplaint({
        user_id:  user.id,
        nama:     user.nama,
        email:    user.email,
        komplain: form.komplain,
        feedback: form.feedback,
        status:   "Belum Ditangani",
      });
      setSuccess("Komplain & feedback berhasil dikirim! Tim kami akan segera menindaklanjuti.");
      setForm({ komplain: "", feedback: "" });
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError("Gagal mengirim komplain. Coba lagi nanti.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
          Komplain & Feedback
        </h1>
        <p className="text-sm text-gray-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
          Sampaikan keluhan atau masukan Anda — kami akan segera merespons
        </p>
      </div>

      {/* Alert */}
      {success && (
        <div className="mb-5 flex items-start gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl"
          style={{ fontFamily: "Inter, sans-serif" }}>
          <LuCircleCheck className="flex-shrink-0 mt-0.5" /> {success}
        </div>
      )}
      {error && (
        <div className="mb-5 flex items-start gap-2 bg-red-50 border border-red-200 text-[#CC5F5F] text-sm px-4 py-3 rounded-xl"
          style={{ fontFamily: "Inter, sans-serif" }}>
          <LuCircleAlert className="flex-shrink-0 mt-0.5" /> {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-xl">
        <div className="flex items-center gap-2 mb-5">
          <LuMessageSquare className="text-[#5570F1] text-xl" />
          <h3 className="font-semibold text-[#1C1D22]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Form Pengaduan
          </h3>
        </div>

        {/* Info pengirim */}
        <div className="bg-[#eef1fe] rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#5570F1] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
            {user.nama?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1C1D22]" style={{ fontFamily: "Inter, sans-serif" }}>
              {user.nama}
            </p>
            <p className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Komplain */}
          <div>
            <label className="block text-sm font-medium text-[#1C1D22] mb-1.5"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Komplain <span className="text-red-400">*</span>
            </label>
            <textarea
              name="komplain"
              value={form.komplain}
              onChange={handleChange}
              disabled={loading}
              rows={4}
              placeholder="Ceritakan kendala atau masalah yang Anda alami..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#5570F1] transition resize-none disabled:opacity-60"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium text-[#1C1D22] mb-1.5"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Feedback / Saran <span className="text-gray-400 font-normal">(opsional)</span>
            </label>
            <textarea
              name="feedback"
              value={form.feedback}
              onChange={handleChange}
              disabled={loading}
              rows={3}
              placeholder="Berikan saran atau penilaian Anda terhadap layanan kami..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#5570F1] transition resize-none disabled:opacity-60"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5570F1] hover:bg-[#4460e0] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}>
            {loading ? "Mengirim..." : "Kirim Komplain & Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
