export default function InputField({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:border-[#5570F1] transition"
      style={{ fontFamily: "Inter, sans-serif" }}
    />
  );
}
