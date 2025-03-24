import { Link } from "wouter";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#333333] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="text-2xl font-heading font-bold mb-6 inline-block">
                <span className="text-white">Bus</span>
                <span className="text-[#FF6B00]">Viagens</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Sua jornada, nosso compromisso. Viaje com conforto, segurança e o melhor custo-benefício do Brasil.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Sobre Nós</a>
              </li>
              <li>
                <a href="#routes" className="text-gray-400 hover:text-white transition">Rotas Populares</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition">Nossos Serviços</a>
              </li>
              <li>
                <a href="#offers" className="text-gray-400 hover:text-white transition">Ofertas Especiais</a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition">Perguntas Frequentes</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Programa de Fidelidade</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Informações</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Termos e Condições</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Política de Privacidade</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Política de Bagagens</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Direitos do Passageiro</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Cancelamentos e Reembolsos</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Acessibilidade</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-[#FF6B00]" />
                <span className="text-gray-400">Av. Paulista, 1000, São Paulo - SP, 01310-000</span>
              </li>
              <li className="flex items-start">
                <FaPhoneAlt className="mt-1 mr-3 text-[#FF6B00]" />
                <span className="text-gray-400">0800 123 4567</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-[#FF6B00]" />
                <span className="text-gray-400">contato@busviagens.com</span>
              </li>
              <li className="flex items-start">
                <FaClock className="mt-1 mr-3 text-[#FF6B00]" />
                <span className="text-gray-400">
                  Seg-Sex: 8h às 20h<br />
                  Sáb-Dom: 9h às 18h
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} BusViagens. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4">
              {/* Payment method icons */}
              <svg className="h-6 w-10 text-gray-400" viewBox="0 0 40 25" fill="currentColor">
                <rect width="40" height="25" rx="4" fill="currentColor" fillOpacity="0.1" />
                <path d="M10 12.5H30M20 7.5V17.5" stroke="currentColor" strokeWidth="2" />
              </svg>
              <svg className="h-6 w-10 text-gray-400" viewBox="0 0 40 25" fill="currentColor">
                <rect width="40" height="25" rx="4" fill="currentColor" fillOpacity="0.1" />
                <circle cx="20" cy="12.5" r="5" stroke="currentColor" strokeWidth="2" />
              </svg>
              <svg className="h-6 w-10 text-gray-400" viewBox="0 0 40 25" fill="currentColor">
                <rect width="40" height="25" rx="4" fill="currentColor" fillOpacity="0.1" />
                <path d="M10 12.5H30" stroke="currentColor" strokeWidth="2" />
              </svg>
              <svg className="h-6 w-10 text-gray-400" viewBox="0 0 40 25" fill="currentColor">
                <rect width="40" height="25" rx="4" fill="currentColor" fillOpacity="0.1" />
                <path d="M15 7.5L25 17.5M25 7.5L15 17.5" stroke="currentColor" strokeWidth="2" />
              </svg>
              <svg className="h-6 w-10 text-gray-400" viewBox="0 0 40 25" fill="currentColor">
                <rect width="40" height="25" rx="4" fill="currentColor" fillOpacity="0.1" />
                <path d="M20 7.5L15 12.5L20 17.5L25 12.5L20 7.5Z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
