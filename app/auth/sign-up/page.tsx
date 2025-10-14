import { SignUpForm } from "@/components/sign-up-form";
import { ModalProvider } from "@/components/modal-context";

export default function Page() {
  return (
    <ModalProvider>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignUpForm />
        </div>
      </div>
    </ModalProvider>
  );
}
