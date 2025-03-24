import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Clock, 
  Calendar,
  Wifi,
  Plug,
  Snowflake
} from "lucide-react";
import { images } from "@/lib/data";

interface RouteCardProps {
  id: number;
  origin: string;
  destination: string;
  price: string;
  duration: string;
  frequency: string;
  amenities: string[];
  imageSrc: string;
}

const RouteCard = ({ 
  id, 
  origin, 
  destination, 
  price,
  duration,
  frequency,
  amenities,
  imageSrc
}: RouteCardProps) => {
  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-md hover:translate-y-[-5px] transition-transform duration-300">
      <img 
        src={imageSrc} 
        alt={`${origin} to ${destination}`} 
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-heading font-semibold text-lg">{origin} → {destination}</h3>
          <span className="text-[#FF6B00] font-medium">a partir de R$ {price}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span className="flex items-center">
            <Clock className="mr-1 h-4 w-4" /> {duration} de viagem
          </span>
          <span className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" /> {frequency}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.map((amenity, index) => {
            let icon;
            switch(amenity) {
              case "Wi-Fi":
                icon = <Wifi className="mr-1 h-3 w-3" />;
                break;
              case "Tomadas USB":
                icon = <Plug className="mr-1 h-3 w-3" />;
                break;
              case "Ar-condicionado":
                icon = <Snowflake className="mr-1 h-3 w-3" />;
                break;
              default:
                icon = null;
            }
            
            return (
              <span key={index} className="bg-gray-100 py-1 px-2 rounded-md text-xs flex items-center">
                {icon}{amenity}
              </span>
            );
          })}
        </div>
        <Button
          variant="outline"
          className="block w-full text-center py-2 border border-[#0052CC] text-[#0052CC] rounded-md font-medium hover:bg-[#0052CC] hover:text-white transition"
        >
          Ver Detalhes
        </Button>
      </CardContent>
    </Card>
  );
};

const PopularRoutes = () => {
  const { data: routes = [], isLoading } = useQuery({
    queryKey: ['/api/routes/popular'],
  });
  
  return (
    <section id="routes" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-4xl mb-3">Rotas Populares</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Confira os destinos mais procurados e encontre as melhores opções para sua viagem
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="w-full h-48 bg-gray-200 animate-pulse" />
                <CardContent className="p-5">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-3" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.slice(0, 3).map((route: any, index: number) => (
              <RouteCard
                key={route.id}
                id={route.id}
                origin={route.origin.name}
                destination={route.destination.name}
                price={route.price}
                duration={route.duration}
                frequency={route.frequency}
                amenities={route.amenities}
                imageSrc={images.routes[index % images.routes.length]}
              />
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <Button 
            className="inline-block py-3 px-8 bg-[#0052CC] text-white rounded-md font-medium hover:bg-opacity-90 transition"
          >
            Ver Todos os Destinos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
