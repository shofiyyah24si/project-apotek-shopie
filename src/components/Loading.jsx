import { MdMedicalServices } from "react-icons/md";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white gap-4">
            <div className="relative">
                <div className="w-14 h-14 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
                <MdMedicalServices className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-600 text-xl" />
            </div>
            <p className="text-teal-600 text-sm font-medium">Memuat...</p>
        </div>
    );
}
