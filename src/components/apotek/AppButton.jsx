/**
 * AppButton — Basic Component
 * Tombol reusable dengan berbagai variant warna.
 * Meneruskan semua props ke <button> agar kompatibel dengan
 * shadcn DialogTrigger asChild dan komponen lain yang inject props.
 *
 * Props:
 *   - children  : isi teks tombol
 *   - type      : "primary" | "secondary" | "danger" | "warning" | "ghost"
 *   - onClick   : fungsi yang dijalankan saat diklik
 *   - className : class tambahan
 *   - ...rest   : props lain diteruskan ke <button> (misal dari DialogTrigger asChild)
 */
export default function AppButton({
  children,
  type = "primary",
  onClick,
  className = "",
  ...rest
}) {
  const variants = {
    primary:   "bg-[#5570F1] hover:bg-[#4460e0] text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-600",
    danger:    "bg-[#CC5F5F] hover:bg-red-600 text-white",
    warning:   "bg-orange-400 hover:bg-orange-500 text-white",
    ghost:     "border border-gray-200 hover:bg-gray-50 text-gray-500",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition ${variants[type]} ${className}`}
      style={{ fontFamily: "Inter, sans-serif" }}
      {...rest}
    >
      {children}
    </button>
  );
}
