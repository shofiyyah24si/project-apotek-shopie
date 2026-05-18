export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h2
        className="text-lg font-semibold text-[#1C1D22]"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-xs text-gray-400 mt-0.5"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
