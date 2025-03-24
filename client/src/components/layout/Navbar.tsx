import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-3">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="text-2xl font-heading font-bold">
                <span className="text-[#0052CC]">Bus</span>
                <span className="text-[#FF6B00]">Viagens</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#routes" className="font-medium hover:text-[#0052CC] transition">
              Rotas Populares
            </a>
            <a href="#offers" className="font-medium hover:text-[#0052CC] transition">
              Ofertas
            </a>
            <a href="#services" className="font-medium hover:text-[#0052CC] transition">
              Serviços
            </a>
            <a href="#faq" className="font-medium hover:text-[#0052CC] transition">
              FAQ
            </a>
            <a href="#contact" className="font-medium hover:text-[#0052CC] transition">
              Contato
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="py-2 px-4 font-medium">
              Login
            </Button>
            <Button 
              className="py-2 px-4 bg-[#FF6B00] hover:bg-opacity-90 text-white rounded-md font-medium border-none"
            >
              Cadastre-se
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-dark focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="py-3 space-y-3">
            <a
              href="#routes"
              className="block py-2 font-medium hover:text-[#0052CC] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Rotas Populares
            </a>
            <a
              href="#offers"
              className="block py-2 font-medium hover:text-[#0052CC] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Ofertas
            </a>
            <a
              href="#services"
              className="block py-2 font-medium hover:text-[#0052CC] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </a>
            <a
              href="#faq"
              className="block py-2 font-medium hover:text-[#0052CC] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="block py-2 font-medium hover:text-[#0052CC] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
            <div className="pt-2 border-t border-gray-200 flex flex-col space-y-3">
              <Button variant="ghost" className="block py-2 font-medium justify-start">
                Login
              </Button>
              <Button 
                className="block py-2 px-4 bg-[#FF6B00] hover:bg-opacity-90 text-white rounded-md font-medium text-center border-none"
              >
                Cadastre-se
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
