"use client";

import { AIAgronomistButton } from "@/components/ai-agronomist-button";

export function AIAgronomistProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AIAgronomistButton />
    </>
  );
}