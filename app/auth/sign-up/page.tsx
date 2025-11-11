import { SignupForm } from "@/components/signup/signup-form-page";

export default function SignupPage() {
   return (
        <div className="flex flex-col min-h-screen bg-[url('/kontur.svg')] bg-cover bg-center md:bg-muted">
          <main className="flex flex-col items-center flex-1">
            <div className="w-full flex flex-col gap-10 items-center justify-center flex-1 min-h-0">
              <div className="w-full max-w-sm md:max-w-xl">
                <SignupForm />
              </div>
            </div>
          </main>
        </div>
      );
    }