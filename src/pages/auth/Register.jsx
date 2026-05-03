import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-1 text-center">Buat Akun Baru ✨</h2>
            <p className="text-center text-sm text-gray-400 mb-6">Daftar sebagai apoteker FarmaCare+</p>

            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 outline-none focus:border-teal-500"
                        placeholder="Nama lengkap Anda" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 outline-none focus:border-teal-500"
                        placeholder="you@example.com" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 outline-none focus:border-teal-500"
                        placeholder="********" />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                    <input type="password" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 outline-none focus:border-teal-500"
                        placeholder="********" />
                </div>
                <button type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm">
                    Daftar
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-teal-600 font-medium hover:underline">Masuk</Link>
            </p>
        </div>
    );
}
