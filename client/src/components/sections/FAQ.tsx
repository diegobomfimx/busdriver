import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { motion } from "framer-motion";

const FAQ = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-4xl mb-3">Perguntas Frequentes</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Encontre respostas para as dúvidas mais comuns</p>
        </div>
        
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion
            type="single"
            collapsible
            value={openItem || undefined}
            onValueChange={(value) => setOpenItem(value)}
            className="space-y-4"
          >
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id.toString()}
                className="border-b border-gray-200 py-4"
              >
                <AccordionTrigger className="flex justify-between items-center w-full text-left font-medium text-lg focus:outline-none">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="mt-3 text-gray-600">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
