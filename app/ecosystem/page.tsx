import { FloatingAIButton } from "@/components/floating-ai-button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Text } from "@/components/retroui/Text";
import Marquee from "@/components/ui/marquee";

export default function EcosystemPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/kontur.svg'),url('/landscape.svg')] bg-cover bg-position-[center,bottom] md:bg-muted">
      <Header />
      <main className="flex flex-col items-center flex-1">
        <div className="w-full flex flex-col gap-10 items-center justify-center flex-1 min-h-0">
          <div className="w-full max-w-sm md:max-w-5xl text-center">
            <Text as="h1">Let's Join Our Ecosystems!</Text>
          </div>
          <div className="w-full justify-center">
            <Marquee items={[
              "/partner/mitra1.webp", "/partner/mitra2.webp", "/partner/mitra3.webp", "/partner/mitra4.webp", "/partner/mitra5.webp", "/partner/mitra6.webp", "/partner/mitra7.webp",
              
              ]}
              />
          </div>
        </div>
      </main>
      <FloatingAIButton />
      <Footer />
    </div>
  );
}