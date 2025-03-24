import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().email({ message: "Insira um e-mail válido" }),
});

type FormData = z.infer<typeof formSchema>;

const Newsletter = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/newsletter", data);
      const result = await response.json();
      
      toast({
        title: "Inscrição realizada!",
        description: result.message || "Obrigado por se inscrever em nossa newsletter!",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Erro ao se inscrever",
        description: "Ocorreu um erro ao processar sua inscrição. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.section 
      className="py-12 md:py-16 bg-[#0052CC] text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
            Fique por dentro das nossas ofertas
          </h2>
          <p className="mb-8 opacity-90">
            Receba promoções exclusivas, novidades e dicas de viagem diretamente no seu e-mail
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder="Seu melhor e-mail"
                        className="py-3 px-4 rounded-md focus:outline-none text-dark w-full"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="py-3 px-6 bg-[#FF6B00] text-white rounded-md font-medium hover:bg-opacity-90 transition whitespace-nowrap border-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Quero Receber"}
              </Button>
            </form>
          </Form>
          
          <p className="text-sm mt-4 opacity-80">
            Ao se inscrever, você concorda com nossa <a href="#" className="underline">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Newsletter;
