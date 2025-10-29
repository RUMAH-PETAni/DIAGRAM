import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero"
import { ThemeSwitcher } from "@/components/theme-switcher";
import { FloatingAIButton } from "@/components/floating-ai-button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/kontur.svg')] bg-cover bg-center md:bg-muted">
      <header className="sticky top-0 z-50 bg-background/50 w-full flex justify-center border-b border-b-foreground/10 h-16 backdrop-blur-sm">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <ThemeSwitcher />
          <AuthButton />
        </div>
      </header>
      <main className="flex flex-col items-center flex-1">
        <div className="w-full flex flex-col gap-10 items-center justify-center flex-1 min-h-0">
          <div className="w-full max-w-sm md:max-w-4xl">
            <Hero />
          </div>
        </div>
      </main>
      <FloatingAIButton />
      <footer className="bg-background/50 w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-6 backdrop-blur-sm">
        <p>
          © 2025 |{" "}
          <a
            href="https://rumahpetani.cloud/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            RUMAHPETAni
          </a>
        </p>
      
      </footer>
    </div>
  );
}