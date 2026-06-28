import Navbar          from "./components/Navbar";
import Hero            from "./components/Hero";
import InfoCards       from "./components/InfoCards";
import Katalog         from "./components/Katalog";
import MemberSection   from "./components/MemberSection";
import Footer          from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <InfoCards />
      <Katalog />
      <MemberSection />
      <Footer />
      {/* Floating WhatsApp — tampil di semua halaman landing */}
      <FloatingWhatsApp />
    </div>
  );
}
