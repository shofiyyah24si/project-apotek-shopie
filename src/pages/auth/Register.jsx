import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div>
            <h2 className="text-2xl font-poppins-extrabold text-gray-800 mb-1">Daftar Akun</h2>
            <p className="text-sm text-gray-400 mb-7">Buat akun apoteker baru</p>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
                    <input type="text"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                        placeholder="Nama lengkap Anda" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input type="email"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                        placeholder="you@example.com" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    <input type="password"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                        placeholder="********" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Password</label>
                    <input type="password"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                        placeholder="********" />
                </div>
                <button type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl transition duration-200 text-sm">
                    Daftar
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-teal-600 font-semibold hover:underline">Masuk</Link>
            </p>
        </div>
    );
}
