import { Button } from "@/components/ui/button";
import { specialOffers, images } from "@/lib/data";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const OfferCard = ({
  title,
  description,
  image,
  label,
  ctaText,
  ctaLink,
}: {
  title: string;
  description: string;
  image: string;
  label: string;
  ctaText: string;
  ctaLink: string;
}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative rounded-lg overflow-hidden shadow-md hover:translate-y-[-5px] transition-transform duration-300"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover brightness-75"
      />
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div>
          <span className="bg-[#FF6B00] text-white py-1 px-3 rounded-full text-sm font-medium">
            {label}
          </span>
          <h3 className="font-heading font-bold text-white text-2xl mt-3">{title}</h3>
          <p className="text-white mt-2 max-w-xs">{description}</p>
        </div>
        <div>
          <Button 
            className="inline-block py-2 px-6 bg-white text-[#0052CC] rounded-md font-medium hover:bg-opacity-90 transition"
            asChild
          >
            <a href={ctaLink}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const SpecialOffers = () => {
  return (
    <section id="offers" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-4xl mb-3">Ofertas Especiais</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Aproveite nossas promoções e economize em suas viagens
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specialOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              title={offer.title}
              description={offer.description}
              image={offer.image}
              label={offer.label}
              ctaText={offer.ctaText}
              ctaLink={offer.ctaLink}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-[#0052CC] rounded-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="font-heading font-bold text-white text-2xl md:text-3xl mb-4">
                Programa de Fidelidade
              </h3>
              <p className="text-white opacity-90 mb-6">
                Acumule pontos a cada viagem e troque por passagens, descontos exclusivos e muito mais.
              </p>
              <ul className="space-y-3 text-white mb-8">
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-5 w-5" />
                  <span>Ganhe 1 ponto a cada R$ 10 em passagens</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-5 w-5" />
                  <span>Acesso a ofertas exclusivas para membros</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-5 w-5" />
                  <span>Prioridade no embarque e atendimento</span>
                </li>
              </ul>
              <Button className="inline-block py-3 px-6 bg-white text-[#0052CC] rounded-md font-medium hover:bg-opacity-90 transition">
                Cadastre-se Grátis
              </Button>
            </div>
            <div className="hidden md:block">
              <img
                src={images.specialOffers[2]}
                alt="Programa de Fidelidade"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers;
