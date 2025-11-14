import { FloatingAIButton } from "@/components/floating-ai-button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function CampaignReportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/kontur.svg')] bg-cover bg-center md:bg-muted">
      <Header />
      <main className="flex flex-col items-center flex-1">
        <div className="w-full flex flex-col gap-10 items-center justify-center flex-1 min-h-0">
          <div className="w-full max-w-sm md:max-w-5xl">
           
          </div>
        </div>
      </main>
      <FloatingAIButton />
      <Footer />
    </div>
  );
}