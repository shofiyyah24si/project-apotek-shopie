import { Link } from "react-router-dom";
import AppTableRow from "./AppTableRow";
import AppBadge from "./AppBadge";
import StockBadge from "./StockBadge";
import PriceDisplay from "./PriceDisplay";

export default function MedicineTableRow({ med, categoryColor }) {
  return (
    <AppTableRow>
      <td
        className="px-5 py-3.5 font-medium text-gray-400 text-xs"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {med.id}
      </td>
      <td className="px-5 py-3.5">
        <Link
          to={`/medicines/${med.id}`}
          className="text-[#5570F1] hover:text-[#4460e0] font-medium hover:underline"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {med.name}
        </Link>
      </td>
      <td className="px-5 py-3.5">
        <AppBadge className={categoryColor[med.category] || "bg-gray-100 text-gray-600"}>
          {med.category}
        </AppBadge>
      </td>
      <td className="px-5 py-3.5">
        <StockBadge stock={med.stock} />
      </td>
      <td className="px-5 py-3.5">
        <PriceDisplay amount={med.price} />
      </td>
      <td
        className="px-5 py-3.5 text-gray-400 text-xs"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {med.expiry}
      </td>
    </AppTableRow>
  );
}
