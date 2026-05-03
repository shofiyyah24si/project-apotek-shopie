import axios from "axios";
import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({ email: "", password: "" });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        axios
            .post("https://dummyjson.com/user/login", {
                username: dataForm.email,
                password: dataForm.password,
            })
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data.message);
                    return;
                }
                navigate("/");
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Username atau password salah");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <h2 className="text-2xl font-poppins-extrabold text-gray-800 mb-1">Masuk</h2>
            <p className="text-sm text-gray-400 mb-7">Silakan login untuk melanjutkan</p>

            {error && (
                <div className="bg-red-50 mb-5 p-3 text-sm text-red-600 rounded-xl flex items-center gap-2 border border-red-100">
                    <BsFillExclamationDiamondFill />
                    {error}
                </div>
            )}

            {loading && (
                <div className="bg-teal-50 mb-5 p-3 text-sm text-teal-600 rounded-xl flex items-center gap-2">
                    <ImSpinner2 className="animate-spin" />
                    Mohon tunggu...
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
                    <input type="text" name="email" onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                        placeholder="Masukkan username" />
                </div>
                <div>
                    <div className="flex justify-between mb-1.5">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <Link to="/forgot" className="text-xs text-teal-600 hover:underline">Lupa password?</Link>
                    </div>
                    <input type="password" name="password" onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                        placeholder="********" />
                </div>
                <button type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl transition duration-200 text-sm mt-2">
                    Masuk
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                Belum punya akun?{" "}
                <Link to="/register" className="text-teal-600 font-semibold hover:underline">Daftar sekarang</Link>
            </p>
        </div>
    );
}
