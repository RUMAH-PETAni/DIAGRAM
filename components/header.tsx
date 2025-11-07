import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { NavigationWrapper } from "@/components/navigation-wrapper";

export function Header() {
  return (
    <header className="w-full flex justify-center h-20">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm gap-2">
        <AuthButton />
         <div className="flex gap-2">
          <ThemeSwitcher />
          <NavigationWrapper />
      </div>
      </div>
    </header>
  );
}