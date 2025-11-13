import { FloatingAIButton } from "@/components/floating-ai-button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Text } from "@/components/retroui/Text";
import Marquee from "@/components/ui/marquee";
import EcosystemContent from "./EcosystemContent";

export default function EcosystemPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[url('/kontur.svg')] bg-cover bg-center z-0">
      {/* Layer landscape di bawah */}
      <div
        className="absolute bottom-0 left-0 w-full h-screen bg-[url('/landscape2.svg')] bg-cover bg-bottom bg-no-repeat z-0"
      ></div>
      <div className="relative z-10">
      <Header />
      <main className="flex flex-col items-center flex-1">
        <EcosystemContent />
      </main>
      <FloatingAIButton />
      <Footer />
      </div>
    </div>
  );
}