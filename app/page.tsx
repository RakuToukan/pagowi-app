import Navbar from "@/components/Navbar";
import HeroSection from "./HeroSection";
import CreateSection from "./CreateSection";
import AboutSection from "./AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CreateSection />
      <AboutSection />
      <Footer />
    </>
  );
}
