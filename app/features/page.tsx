import { Features } from "@/components/features"
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";


export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/kontur.svg')] bg-cover bg-center md:bg-muted">
      <Header />
      <main className="flex flex-col items-center flex-1">
        <div className="w-full flex flex-col gap-10 items-center justify-center flex-1 min-h-0">
          <div className="w-full max-w-sm md:max-w-5xl">
            <Features />
          </div>
        </div>
      </main>


    </div>
  );
}