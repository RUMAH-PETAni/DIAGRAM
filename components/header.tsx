import { AuthButtonClient } from "@/components/auth-button-client";

import { Navigation } from "@/components/navigation";


export function Header() {
  return (
    <header className="w-full flex justify-center h-20">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm gap-2">
        <AuthButtonClient />
         <div className="flex gap-2">
          <Navigation />
      </div>
      </div>
    </header>
  );
}