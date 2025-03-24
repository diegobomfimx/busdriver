import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { images } from "@/lib/data";
import { motion } from "framer-motion";

const AppDownload = () => {
  const features = [
    "Compra rápida e segura",
    "Check-in digital",
    "Notificações sobre sua viagem",
    "Acesso a ofertas exclusivas",
  ];
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-gray-50 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <h2 className="font-heading font-bold text-2xl md:text-4xl mb-4">
                Baixe Nosso Aplicativo
              </h2>
              <p className="text-gray-600 mb-6">
                Tenha sua passagem na palma da mão. Compre, gerencie suas viagens e receba atualizações em tempo real.
              </p>
              
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-[#0052CC] mr-2 mt-1 h-5 w-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline"
                  className="flex items-center bg-black text-white py-2 px-4 rounded-lg hover:bg-opacity-80 transition border-none"
                >
                  <FaApple className="text-2xl mr-2" />
                  <div>
                    <div className="text-xs">Baixe na</div>
                    <div className="font-medium">App Store</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline"
                  className="flex items-center bg-black text-white py-2 px-4 rounded-lg hover:bg-opacity-80 transition border-none"
                >
                  <FaGooglePlay className="text-2xl mr-2" />
                  <div>
                    <div className="text-xs">Disponível no</div>
                    <div className="font-medium">Google Play</div>
                  </div>
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src={images.travel[0]}
                alt="BusViagens App" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppDownload;
