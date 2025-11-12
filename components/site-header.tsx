import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ChevronLeft } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) sticky top-0 z-50 bg-background rounded-t-xl shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
   
       
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="sm:hidden">
            <a
              href="/features"
              rel="noopener noreferrer"
              className="dark:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="/features"
              rel="noopener noreferrer"
              className="dark:text-foreground"
            >
              Back
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
