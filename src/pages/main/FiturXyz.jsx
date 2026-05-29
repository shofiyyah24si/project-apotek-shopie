
//import component button
import { Button } from "@/components/ui/button";
import PageHeader from "../../components/PageHeader";

export default function FiturXyz() {
  return (
    <div className="space-y-4">
      <PageHeader title="Fitur Xyz" breadcrumb={["Dashboard", "Order List"]} />

      <p className="text-gray-600 font-medium">Ini Halaman Fitur Xyz</p>

      <Button variant="destructive">Contoh Tombol Destructive</Button>
      <Button variant="default">Contoh Tombol Default</Button>
      <Button variant="ghost">Contoh Tombol Ghost </Button>
      <Button variant="link">Contoh Tombol Link</Button>
      <Button variant="secondary">Contoh Tombol Secondary</Button>
      <Button variant="outline">Contoh Tombol Outline</Button>

    </div>
  );
}
