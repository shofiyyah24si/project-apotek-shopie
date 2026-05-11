import { HiOutlineHome } from "react-icons/hi2";

export default function PageHeader({ title, breadcrumb, children }) {
  const crumbs = Array.isArray(breadcrumb)
    ? breadcrumb
    : (breadcrumb || "Dashboard").split("/").map((c) => c.trim());

  return (
    <div className="flex items-center justify-between px-4 pb-4">
      <div>
        <h1
          className="text-2xl font-bold text-[#1C1D22]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {title || "Dashboard"}
        </h1>
        <div className="flex items-center gap-1.5 mt-1">
          <HiOutlineHome className="text-base text-gray-400" />
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="text-gray-400 text-xs">/</span>
              <span
                className={`text-xs ${
                  i === crumbs.length - 1
                    ? "text-[#5570F1] font-medium"
                    : "text-gray-400"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {crumb}
              </span>
            </span>
          ))}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}