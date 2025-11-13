import { FloatingAIButton } from "@/components/floating-ai-button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Text } from "@/components/retroui/Text";
import Marquee from "@/components/ui/marquee";
import EcosystemContent from "./EcosystemContent";

export default function EcosystemPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/kontur.svg'),url('/landscape2.svg')] bg-cover bg-position-[center,bottom] md:bg-muted">
      <Header />
      <main className="flex flex-col items-center flex-1">
        <EcosystemContent />
      </main>
      <FloatingAIButton />
      <Footer />
    </div>
  );
}