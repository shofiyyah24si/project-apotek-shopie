import { Link } from "react-router-dom";

export default function Forgot() {
    return (
        <div>
            <h2 className="text-2xl font-poppins-extrabold text-gray-800 mb-1">Lupa Password?</h2>
            <p className="text-sm text-gray-400 mb-7">Masukkan email untuk menerima link reset password</p>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input type="email"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                        placeholder="you@example.com" />
                </div>
                <button type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl transition duration-200 text-sm">
                    Kirim Link Reset
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                Ingat password?{" "}
                <Link to="/login" className="text-teal-600 font-semibold hover:underline">Kembali Login</Link>
            </p>
        </div>
    );
}
