import { useState } from "react";
import { Link } from "react-router-dom";
import { LuCircleCheck } from "react-icons/lu";

export default function Forgot() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1C1D22] mb-1"
        style={{ fontFamily: "Poppins, sans-serif" }}>
        Lupa Password?
      </h2>
      <p className="text-sm text-gray-400 mb-7"
        style={{ fontFamily: "Inter, sans-serif" }}>
        Masukkan email untuk menerima link reset password
      </p>

      {/* Success state */}
      {sent ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-[#eef1fe] rounded-full flex items-center justify-center mx-auto mb-4">
            <LuCircleCheck className="text-[#5570F1] text-3xl" />
          </div>
          <p className="font-semibold text-[#1C1D22] mb-1"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Email Terkirim!
          </p>
          <p className="text-sm text-gray-400 mb-6"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Cek inbox <span className="text-[#5570F1] font-medium">{email}</span> untuk link reset password.
          </p>
          <button onClick={() => setSent(false)}
            className="text-sm text-[#5570F1] hover:underline"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Kirim ulang
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1C1D22] mb-1.5"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#5570F1] focus:ring-2 focus:ring-[#eef1fe] transition"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
          <button type="submit"
            className="w-full bg-[#5570F1] hover:bg-[#4460e0] text-white font-semibold py-2.5 rounded-xl transition text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Kirim Link Reset
          </button>
        </form>
      )}

      <p className="text-center text-sm text-gray-500 mt-6"
        style={{ fontFamily: "Inter, sans-serif" }}>
        Ingat password?{" "}
        <Link to="/login" className="text-[#5570F1] font-semibold hover:underline">
          Kembali Login
        </Link>
      </p>
    </div>
  );
}