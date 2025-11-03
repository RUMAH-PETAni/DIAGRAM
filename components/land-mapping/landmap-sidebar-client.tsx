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
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { MapPinned, Plus, Layers, Download, Upload, Ruler, CloudUpload, MapPlus, FileUser } from "lucide-react"



export function LandMapSidebarClient({ user, ...props }: { 
  user: { name: string; email: string; avatar: string }; 
  [key: string]: any;
}) {


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
          <SidebarGroupLabel>Land Information :</SidebarGroupLabel>
          <div className=" border rounded-lg bg-card max-h-70 overflow-y-auto">
            <div className="p-2">
              <FieldGroup >
                <Field>
                  <FieldLabel className="text-sm">Plot</FieldLabel>
                  <Input placeholder="Enter plot name" className="text-sm" />
                </Field>
                <Field>
                  <FieldLabel className="text-sm">Land Owner</FieldLabel>
                  <Input placeholder="Enter land owner name" className="text-sm" />
                </Field>
                <Field>
                  <FieldLabel className="text-sm">National ID</FieldLabel>
                  <Input placeholder="Enter national ID" className="text-sm" />
                </Field>
                <Field>
                  <FieldLabel className="text-sm">Land Type</FieldLabel>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select land type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agroforestry" className="text-sm">Agroforestry</SelectItem>
                      <SelectItem value="monoculture" className="text-sm">Monoculture</SelectItem>
                      <SelectItem value="other" className="text-sm">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                
                <Field>
                  <FieldLabel className="text-sm">Main Commodity</FieldLabel>
                  <Select>
                    <SelectTrigger className="text-sm text-left">
                      <SelectValue placeholder="Select main commodity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tree-plants" className="text-sm text-left">Tree Plants<br/>(eg. Woody Trees)</SelectItem>
                      <SelectItem value="commercial-plants" className="text-sm text-left">Commercial Plants <br/>(eg. Coffee, Cacao, Rubber)</SelectItem>
                      <SelectItem value="food-plants" className="text-sm text-left">Crops<br/>(eg. Fruit, Grain, Vegetables)</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                <FieldLabel className="text-sm">Area (ha)</FieldLabel>
                  <Input placeholder="Area in hectares" type="number" className="text-sm" />
                </Field>
                
              </FieldGroup>
            </div>
          </div>
        </SidebarGroup>
       
        <SidebarGroup>
          <SidebarGroupLabel>Import or Export Polygon</SidebarGroupLabel>
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
          
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Submit Data</SidebarGroupLabel>
          <div className="grid w-full gap-2">
          <Button size="sm" variant="outline">
              <CloudUpload className="w-4 h-4 mr-2" />
              Save to Account
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