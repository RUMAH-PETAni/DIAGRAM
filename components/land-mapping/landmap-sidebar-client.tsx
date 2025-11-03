"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileExport,
  IconFileImport,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUpload,
  IconUsers,
} from "@tabler/icons-react"

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { MapPinned, Plus, Layers, Download, Upload, Ruler, CloudUpload, MapPlus } from "lucide-react"


export function LandMapSidebarClient({ user, ...props }: { 
  user: { name: string; email: string; avatar: string }; 
  [key: string]: any;
}) {
  const [landAreas, setLandAreas] = React.useState([
    { id: '1', name: 'Rice Field A', area: '2.5 ha', lastUpdated: '2025-01-15' },
    { id: '2', name: 'Vegetable Garden', area: '0.8 ha', lastUpdated: '2025-01-10' },
    { id: '3', name: 'Plantation Area', area: '5.2 ha', lastUpdated: '2025-01-05' },
  ]);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <MapPinned />
                <span className="text-base font-semibold">Land Mapping</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <div className="grid grid-cols-2 gap-2">
             <Button size="sm" variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
          </div>
          <div className="grid w-full gap-2 mt-2">
          <Button size="sm" variant="outline">
              <CloudUpload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} avatarUrl={user.avatar} />
      </SidebarFooter>
    </Sidebar>
  )
}