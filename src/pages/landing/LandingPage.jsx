import Navbar     from "./components/Navbar";
import Hero       from "./components/Hero";
import InfoCards  from "./components/InfoCards";
import Katalog    from "./components/Katalog";
import Footer     from "./components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <InfoCards />
      <Katalog />
      <Footer />
    </div>
  );
}
