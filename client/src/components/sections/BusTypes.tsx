import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { busTypes } from "@/lib/data";

const BusTypeCard = ({ 
  name, 
  features, 
  basePrice, 
  image 
}: { 
  name: string; 
  features: string[]; 
  basePrice: string; 
  image: string; 
}) => {
  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-md hover:translate-y-[-5px] transition-transform duration-300">
      <img 
        src={image} 
        alt={`Ônibus ${name}`}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-5">
        <h3 className="font-heading font-semibold text-xl mb-3">{name}</h3>
        <ul className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="text-[#28A745] mt-1 mr-2 h-4 w-4" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="text-center pt-2">
          <span className="text-gray-500 text-sm">a partir de</span>
          <p className="text-[#FF6B00] font-heading font-bold text-2xl">R$ {basePrice}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const BusTypes = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-4xl mb-3">Viaje com Conforto e Qualidade</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Escolha entre diferentes tipos de ônibus que melhor atendem às suas necessidades
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {busTypes.map((busType) => (
            <BusTypeCard
              key={busType.id}
              name={busType.name}
              features={busType.features}
              basePrice={busType.basePrice}
              image={busType.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusTypes;
