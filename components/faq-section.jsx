"use client";

import { useId } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection({ faqs }) {
  const id = useId();

  return (
    <div className="max-w-4xl mx-auto">
      <Accordion type="single" collapsible>
        {faqs.map((f, index) => (
          <AccordionItem key={`${id}-${index}`} value={`${id}-${index}`}>
            <AccordionTrigger>{f.question}</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{f.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
