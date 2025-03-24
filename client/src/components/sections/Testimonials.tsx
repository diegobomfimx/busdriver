import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/data";
import { Star, StarHalf } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  route: string;
  rating: number;
  comment: string;
  avatarId: string;
}

const TestimonialCard = ({ 
  name, 
  route, 
  rating, 
  comment, 
  avatarId 
}: TestimonialCardProps) => {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-[#FF6B00] text-[#FF6B00]" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-[#FF6B00] text-[#FF6B00]" />);
    }
    
    return stars;
  };
  
  return (
    <Card className="bg-white p-6 rounded-lg shadow-md">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <div className="text-[#FF6B00] flex">
            {renderStars()}
          </div>
          <span className="ml-2 font-medium">{rating.toFixed(1)}</span>
        </div>
        <p className="text-gray-700 mb-6">{`"${comment}"`}</p>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <img 
              src={`https://randomuser.me/api/portraits/${avatarId}.jpg`}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-gray-500">{route}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-4xl mb-3">O Que Dizem Nossos Clientes</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Experiências reais de quem já viajou conosco</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={cardVariants}>
              <TestimonialCard
                name={testimonial.name}
                route={testimonial.route}
                rating={testimonial.rating}
                comment={testimonial.comment}
                avatarId={testimonial.avatarId}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-10">
          <Button 
            variant="outline"
            className="inline-block py-3 px-8 border border-[#0052CC] text-[#0052CC] rounded-md font-medium hover:bg-[#0052CC] hover:text-white transition"
          >
            Ver Todos os Depoimentos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
