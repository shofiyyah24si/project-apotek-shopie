/**
 * AppButton — Basic Component
 */
export default function AppButton({
  children,
  type = "primary",
  onClick,
  className = "",
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
    >
      {children}
    </button>
  );
}
