import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PopularRoutes from "@/components/sections/PopularRoutes";
import BusTypes from "@/components/sections/BusTypes";
import SpecialOffers from "@/components/sections/SpecialOffers";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Newsletter from "@/components/sections/Newsletter";
import AppDownload from "@/components/sections/AppDownload";
import { Check } from "lucide-react";

const Home = () => {
  return (
    <div className="font-sans antialiased bg-[#F5F7FA] text-[#333333]">
      <Navbar />
      <HeroSection />
      <PopularRoutes />
      <BusTypes />
      <SpecialOffers />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Home;
