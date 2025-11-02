import { LandMapSidebarServer } from '@/components/land-mapping/landmap-sidebar-server'
import LandMapWrapper from '@/components/land-mapping/land-map-wrapper'
import { SiteHeader } from '@/components/site-header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'

export default function LandMappingPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <LandMapSidebarServer variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="@container/main flex flex-1 flex-col gap-2 overflow-hidden">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:px-6 flex-1 overflow-hidden">
              <div className="h-[calc(100vh-var(--header-height)-3rem)] w-full rounded-lg border overflow-hidden flex flex-col">
                <LandMapWrapper className="flex-1" />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
