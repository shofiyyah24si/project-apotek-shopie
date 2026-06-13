import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LuCircleAlert, LuCircleCheck } from "react-icons/lu";
import { ImSpinner2 } from "react-icons/im";
import { userAPI } from "../../services/userAPI";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [showPass, setShowPass] = useState(false);
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!dataForm.email || !dataForm.password) {
      setError("Email dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);

      // Cari user dari Supabase berdasarkan email & password
      const users = await userAPI.loginUser(dataForm.email, dataForm.password);

      if (!users || users.length === 0) {
        setError("Email atau password salah");
        return;
      }

      const user = users[0];

      // Simpan data user ke localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect berdasarkan role
      if (user.role === "admin") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi nanti.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1C1D22] mb-1"
        style={{ fontFamily: "Poppins, sans-serif" }}>
        Masuk
      </h2>
      <p className="text-sm text-gray-400 mb-7"
        style={{ fontFamily: "Inter, sans-serif" }}>
        Silakan login untuk melanjutkan
      </p>

      {/* Error */}
      {error && (
        <div className="bg-red-50 mb-5 p-3 text-sm text-[#CC5F5F] rounded-xl flex items-center gap-2 border border-red-100"
          style={{ fontFamily: "Inter, sans-serif" }}>
          <LuCircleAlert className="flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-[#eef1fe] mb-5 p-3 text-sm text-[#5570F1] rounded-xl flex items-center gap-2"
          style={{ fontFamily: "Inter, sans-serif" }}>
          <ImSpinner2 className="animate-spin flex-shrink-0" />
          Memverifikasi akun...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#1C1D22] mb-1.5"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Email
          </label>
          <input
            type="email" name="email"
            value={dataForm.email}
            onChange={handleChange}
            disabled={loading}
            placeholder="admin@apotek.com"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#5570F1] focus:ring-2 focus:ring-[#eef1fe] transition disabled:opacity-60"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-sm font-medium text-[#1C1D22]"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Password
            </label>
            <Link to="/forgot"
              className="text-xs text-[#5570F1] hover:underline"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Lupa password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              disabled={loading}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#5570F1] focus:ring-2 focus:ring-[#eef1fe] transition pr-24 disabled:opacity-60"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <button type="button"
              onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              style={{ fontFamily: "Inter, sans-serif" }}>
              {showPass ? "Sembunyikan" : "Tampilkan"}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-[#5570F1] hover:bg-[#4460e0] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition text-sm mt-2"
          style={{ fontFamily: "Inter, sans-serif" }}>
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6"
        style={{ fontFamily: "Inter, sans-serif" }}>
        Belum punya akun?{" "}
        <Link to="/register"
          className="text-[#5570F1] font-semibold hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}
