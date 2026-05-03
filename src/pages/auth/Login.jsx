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
        setError(false);

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
                if (err.response) {
                    setError(err.response.data.message || "Login gagal");
                } else {
                    setError(err.message || "Terjadi kesalahan");
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-1 text-center">Selamat Datang 👋</h2>
            <p className="text-center text-sm text-gray-400 mb-6">Masuk ke sistem apotek FarmaCare+</p>

            {error && (
                <div className="bg-red-50 mb-4 p-3 text-sm text-gray-600 rounded-lg flex items-center border border-red-200">
                    <BsFillExclamationDiamondFill className="text-red-500 me-2" />
                    {error}
                </div>
            )}

            {loading && (
                <div className="bg-gray-50 mb-4 p-3 text-sm rounded-lg flex items-center">
                    <ImSpinner2 className="me-2 animate-spin text-teal-600" />
                    Mohon tunggu...
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input type="text" name="email" onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 outline-none focus:border-teal-500"
                        placeholder="Masukkan username" />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" name="password" onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 outline-none focus:border-teal-500"
                        placeholder="********" />
                </div>
                <button type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm">
                    Masuk
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
                Belum punya akun?{" "}
                <Link to="/register" className="text-teal-600 font-medium hover:underline">Daftar</Link>
            </p>
        </div>
    );
}
