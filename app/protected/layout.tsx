import { ReactNode } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-5xl">
        {children}
      </div>
    </main>
  );
}