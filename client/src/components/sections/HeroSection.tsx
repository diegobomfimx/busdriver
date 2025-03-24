import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { 
  MapPin, 
  Calendar as CalendarIcon,
  Search 
} from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { City } from "@/lib/data";

const searchSchema = z.object({
  originId: z.number({
    required_error: "Selecione a origem"
  }),
  destinationId: z.number({
    required_error: "Selecione o destino"
  }),
  departureDate: z.date({
    required_error: "Selecione a data"
  })
});

type SearchValues = z.infer<typeof searchSchema>;

const HeroSection = () => {
  const { toast } = useToast();
  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [originResults, setOriginResults] = useState<City[]>([]);
  const [destinationResults, setDestinationResults] = useState<City[]>([]);
  
  const form = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      departureDate: new Date(),
    }
  });
  
  const { data: cities } = useQuery({
    queryKey: ['/api/cities'],
  });
  
  // Filter cities based on search for origin
  useEffect(() => {
    if (!cities || originSearch.length < 2) {
      setOriginResults([]);
      return;
    }
    
    const filtered = cities.filter((city: City) => 
      city.name.toLowerCase().includes(originSearch.toLowerCase()) ||
      city.state.toLowerCase().includes(originSearch.toLowerCase())
    );
    
    setOriginResults(filtered);
  }, [originSearch, cities]);
  
  // Filter cities based on search for destination
  useEffect(() => {
    if (!cities || destinationSearch.length < 2) {
      setDestinationResults([]);
      return;
    }
    
    const filtered = cities.filter((city: City) => 
      city.name.toLowerCase().includes(destinationSearch.toLowerCase()) ||
      city.state.toLowerCase().includes(destinationSearch.toLowerCase())
    );
    
    setDestinationResults(filtered);
  }, [destinationSearch, cities]);
  
  async function onSubmit(data: SearchValues) {
    try {
      const response = await apiRequest('POST', '/api/search', data);
      const routes = await response.json();
      
      if (routes.length === 0) {
        toast({
          title: "Nenhuma rota encontrada",
          description: "Não encontramos rotas disponíveis para esse trajeto.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Rotas encontradas!",
          description: `Encontramos ${routes.length} opções para sua viagem.`,
          variant: "default"
        });
        
        // In a real app, we would navigate to a search results page
        console.log("Routes found:", routes);
      }
    } catch (error) {
      toast({
        title: "Erro ao buscar rotas",
        description: "Ocorreu um erro ao processar sua busca. Tente novamente.",
        variant: "destructive"
      });
    }
  }
  
  return (
    <section className="relative">
      <div className="bg-gradient-to-r from-[#0052CC] to-[#00A3E0] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h1 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              Viajar de ônibus nunca foi tão simples
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Preços acessíveis, conforto e segurança para suas viagens
            </p>
          </div>
        </div>
      </div>
      
      {/* Search Box */}
      <div className="container mx-auto px-4 relative -mt-8 md:-mt-16">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Origin Field */}
                <FormField
                  control={form.control}
                  name="originId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium mb-2">Origem</FormLabel>
                      <div className="relative">
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                              <FormControl>
                                <Input
                                  placeholder="De onde você vai sair?"
                                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent"
                                  value={originSearch}
                                  onChange={(e) => setOriginSearch(e.target.value)}
                                />
                              </FormControl>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-full" align="start">
                            <Command>
                              <CommandInput 
                                placeholder="Busque por cidade ou estado" 
                                value={originSearch}
                                onValueChange={setOriginSearch}
                              />
                              <CommandList>
                                <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                                <CommandGroup>
                                  {originResults.map((city) => (
                                    <CommandItem
                                      key={city.id}
                                      value={`${city.name}, ${city.state}`}
                                      onSelect={() => {
                                        field.onChange(city.id);
                                        setOriginSearch(`${city.name}, ${city.state}`);
                                      }}
                                    >
                                      {city.name}, {city.state}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormItem>
                  )}
                />
                
                {/* Destination Field */}
                <FormField
                  control={form.control}
                  name="destinationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium mb-2">Destino</FormLabel>
                      <div className="relative">
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                              <FormControl>
                                <Input
                                  placeholder="Para onde você vai?"
                                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent"
                                  value={destinationSearch}
                                  onChange={(e) => setDestinationSearch(e.target.value)}
                                />
                              </FormControl>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-full" align="start">
                            <Command>
                              <CommandInput 
                                placeholder="Busque por cidade ou estado" 
                                value={destinationSearch}
                                onValueChange={setDestinationSearch}
                              />
                              <CommandList>
                                <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                                <CommandGroup>
                                  {destinationResults.map((city) => (
                                    <CommandItem
                                      key={city.id}
                                      value={`${city.name}, ${city.state}`}
                                      onSelect={() => {
                                        field.onChange(city.id);
                                        setDestinationSearch(`${city.name}, ${city.state}`);
                                      }}
                                    >
                                      {city.name}, {city.state}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormItem>
                  )}
                />
                
                {/* Date Field */}
                <FormField
                  control={form.control}
                  name="departureDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium mb-2">Data da Viagem</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <div className="relative">
                              <CalendarIcon className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                              <Button
                                variant="outline"
                                className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent justify-start font-normal text-left"
                              >
                                {field.value ? (
                                  format(field.value, "dd 'de' MMMM 'de' yyyy", { locale: pt })
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                              </Button>
                            </div>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  className="py-3 px-8 bg-[#FF6B00] hover:bg-opacity-90 text-white rounded-md font-medium transition text-lg border-none"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Buscar Passagens
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
