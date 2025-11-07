"use client";

import { useState } from "react";
import { Button } from "@/components/retroui/ButtonCustom";
import { Accordion } from "@/components/retroui/AccordionCustom";
import { X } from "lucide-react";
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
} from "@/components/retroui/DrawerCustom";

export function FAQDrawer({ isOpen = false, onOpenChange }: { isOpen?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const effectiveIsOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  const faqs = [
    {
      id: 1,
      question: "What is DIAGRAM?",
      answer: "DIAGRAM is a Digital Ecosystem for Agroforestry Management that empowers smallholder farmers with climate smart agriculture, data-driven solutions, sustainable technology, and precision agroforestry tools."
    },
    {
      id: 2,
      question: "How can I get started?",
      answer: "You can start by creating an account and exploring our features. Once registered, you'll have access to our mapping tools, monitoring systems, and data library to help manage your farm efficiently."
    },
    {
      id: 3,
      question: "Is there a cost to use DIAGRAM?",
      answer: "DIAGRAM offers a range of free and premium features. Basic access to our tools is free, while advanced features and services may require a subscription or payment."
    },
    {
      id: 4,
      question: "Can I use on mobile devices?",
      answer: "Yes, DIAGRAM is designed to work across devices with responsive design that works well on tablets and smartphones."
    },
    {
      id: 5,
      question: "How do I contact support?",
      answer: "You can contact our support team through the support section of your account, or send us an email at support@rumahpetani.cloud"
    }
  ];

  return (
    <Drawer open={effectiveIsOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="h-[80vh] w-full max-w-5xl mx-auto px-6">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold">Frequently Asked Questions</DrawerTitle>
        </DrawerHeader>  
          <Accordion type="single" collapsible className="w-full p-4">
            {faqs.map((faq) => (
              <Accordion.Item key={faq.id} value={`item-${faq.id}`} className="mb-3">
                <Accordion.Header>
                  <span className="text-left">{faq.question}</span>
                </Accordion.Header>
                <Accordion.Content>
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
      </DrawerContent>
    </Drawer>
  );
}