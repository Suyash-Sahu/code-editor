"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Code2,
  Compass,
  FolderPlus,
  History,
  Home,
  LayoutDashboard,
  Lightbulb,
  type LucideIcon,
  Plus,
  Settings,
  Star,
  Terminal,
  Zap,
  Database,
  FlameIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

// Define the interface for a single playground item, icon is now a string
interface PlaygroundData {
  id: string
  name: string
  icon: string // Changed to string
  starred: boolean
}

// Map icon names (strings) to their corresponding LucideIcon components
const lucideIconMap: Record<string, LucideIcon> = {
  Zap: Zap,
  Lightbulb: Lightbulb,
  Database: Database,
  Compass: Compass,
  FlameIcon: FlameIcon,
  Terminal: Terminal,
  Code2: Code2, // Include the default icon
  // Add any other icons you might use dynamically
}

export function DashboardSidebar({ initialPlaygroundData }: { initialPlaygroundData: PlaygroundData[] }) {
  const pathname = usePathname()
  const [starredPlaygrounds, setStarredPlaygrounds] = useState<PlaygroundData[]>([])
  const [recentPlaygrounds, setRecentPlaygrounds] = useState<PlaygroundData[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setStarredPlaygrounds(initialPlaygroundData.filter((p) => p.starred))
    setRecentPlaygrounds(initialPlaygroundData)
    setIsClient(true)
  }, [initialPlaygroundData])

  if (!isClient) {
    return null;
  }

  return (
    <Sidebar 
      variant="inset" 
      collapsible="icon" 
      className="border-r border-[#83B7DE]/20 dark:border-[#74FF9E]/20 bg-gradient-to-b from-white via-[#83B7DE]/5 to-white dark:from-zinc-950 dark:via-[#74FF9E]/5 dark:to-zinc-950"
    >
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3 justify-center group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#83B7DE]/20 via-[#74FF9E]/20 to-[#256DA4]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            <Image 
              src={"/logo.svg"} 
              alt="logo" 
              height={60} 
              width={60}
              className="relative z-10 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="h-px bg-gradient-to-r from-transparent via-[#83B7DE]/30 dark:via-[#74FF9E]/30 to-transparent"></div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === "/"} 
                tooltip="Home" 
                className="data-[active=true]:bg-gradient-to-r data-[active=true]:from-[#83B7DE]/20 data-[active=true]:to-[#74FF9E]/20 data-[active=true]:border-l-2 data-[active=true]:border-[#83B7DE] dark:data-[active=true]:border-[#74FF9E] hover:bg-gradient-to-r hover:from-[#83B7DE]/10 hover:to-[#74FF9E]/10 transition-all duration-200"
              >
                <Link href="/">
                  <Home className="h-4 w-4 text-[#256DA4] dark:text-[#83B7DE] group-data-[active=true]:text-[#83B7DE] dark:group-data-[active=true]:text-[#74FF9E]" />
                  <span className="text-[#256DA4] dark:text-[#83B7DE] group-data-[active=true]:text-[#256DA4] dark:group-data-[active=true]:text-[#74FF9E] group-data-[active=true]:font-semibold">
                    Home
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === "/dashboard"} 
                tooltip="Dashboard" 
                className="data-[active=true]:bg-gradient-to-r data-[active=true]:from-[#83B7DE]/20 data-[active=true]:to-[#74FF9E]/20 data-[active=true]:border-l-2 data-[active=true]:border-[#83B7DE] dark:data-[active=true]:border-[#74FF9E] hover:bg-gradient-to-r hover:from-[#83B7DE]/10 hover:to-[#74FF9E]/10 transition-all duration-200"
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4 text-[#256DA4] dark:text-[#83B7DE] group-data-[active=true]:text-[#83B7DE] dark:group-data-[active=true]:text-[#74FF9E]" />
                  <span className="text-[#256DA4] dark:text-[#83B7DE] group-data-[active=true]:text-[#256DA4] dark:group-data-[active=true]:text-[#74FF9E] group-data-[active=true]:font-semibold">
                    Dashboard
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Starred Section - Using mint green */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#74FF9E] dark:text-[#74FF9E] font-semibold flex items-center">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[#74FF9E] dark:text-[#74FF9E] fill-[#74FF9E]/20 dark:fill-[#74FF9E]/20" />
              <span>Starred</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupAction 
            title="Add starred playground"
            className="text-[#74FF9E] dark:text-[#74FF9E] hover:bg-[#74FF9E]/10 dark:hover:bg-[#74FF9E]/10"
          >
            <Plus className="h-4 w-4" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {starredPlaygrounds.length === 0 && recentPlaygrounds.length === 0 ? (
                <div className="text-center text-[#256DA4]/60 dark:text-[#83B7DE]/60 py-4 px-2 text-sm">
                  Create your playground
                </div>
              ) : (
                starredPlaygrounds.map((playground) => {
                  const IconComponent = lucideIconMap[playground.icon] || Code2;
                  return (
                    <SidebarMenuItem key={playground.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/playground/${playground.id}`}
                        tooltip={playground.name}
                        className="data-[active=true]:bg-gradient-to-r data-[active=true]:from-[#74FF9E]/20 data-[active=true]:to-[#74FF9E]/10 data-[active=true]:border-l-2 data-[active=true]:border-[#74FF9E] dark:data-[active=true]:border-[#74FF9E] hover:bg-gradient-to-r hover:from-[#74FF9E]/10 hover:to-[#74FF9E]/5 transition-all duration-200"
                      >
                        <Link href={`/playground/${playground.id}`}>
                          {IconComponent && (
                            <IconComponent className="h-4 w-4 text-[#74FF9E] dark:text-[#74FF9E] group-data-[active=true]:scale-110 transition-transform" />
                          )}
                          <span className="text-[#74FF9E] dark:text-[#74FF9E] group-data-[active=true]:font-semibold truncate">
                            {playground.name}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Section - Using sky blue/teal tones */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#256DA4] dark:text-[#83B7DE] font-semibold flex items-center">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-[#256DA4] dark:text-[#83B7DE]" />
              <span>Recent</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupAction 
            title="Create new playground"
            className="text-[#256DA4] dark:text-[#83B7DE] hover:bg-[#256DA4]/10 dark:hover:bg-[#83B7DE]/10"
          >
            <FolderPlus className="h-4 w-4" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {starredPlaygrounds.length === 0 && recentPlaygrounds.length === 0 ? null : (
                recentPlaygrounds.map((playground) => {
                  const IconComponent = lucideIconMap[playground.icon] || Code2;
                  return (
                    <SidebarMenuItem key={playground.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/playground/${playground.id}`}
                        tooltip={playground.name}
                        className="data-[active=true]:bg-gradient-to-r data-[active=true]:from-[#256DA4]/20 data-[active=true]:to-[#83B7DE]/20 data-[active=true]:border-l-2 data-[active=true]:border-[#256DA4] dark:data-[active=true]:border-[#83B7DE] hover:bg-gradient-to-r hover:from-[#256DA4]/10 hover:to-[#83B7DE]/10 transition-all duration-200"
                      >
                        <Link href={`/playground/${playground.id}`}>
                          {IconComponent && (
                            <IconComponent className="h-4 w-4 text-[#256DA4] dark:text-[#83B7DE] group-data-[active=true]:scale-110 transition-transform" />
                          )}
                          <span className="text-[#256DA4] dark:text-[#83B7DE] group-data-[active=true]:font-semibold truncate">
                            {playground.name}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              )}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="View all" 
                  className="hover:bg-gradient-to-r hover:from-[#83B7DE]/10 hover:to-[#74FF9E]/10 transition-all duration-200"
                >
                  <Link href="/playgrounds">
                    <span className="text-sm text-[#256DA4] dark:text-[#83B7DE] font-medium hover:text-[#83B7DE] dark:hover:text-[#74FF9E]">
                      View all playgrounds →
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 pt-3 pb-2">
          <div className="h-px bg-gradient-to-r from-transparent via-[#83B7DE]/30 dark:via-[#74FF9E]/30 to-transparent"></div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Settings" 
              className="data-[active=true]:bg-gradient-to-r data-[active=true]:from-[#256DA4]/20 data-[active=true]:to-[#83B7DE]/20 data-[active=true]:border-l-2 data-[active=true]:border-[#83B7DE] dark:data-[active=true]:border-[#74FF9E] hover:bg-gradient-to-r hover:from-[#83B7DE]/10 hover:to-[#74FF9E]/10 transition-all duration-200"
            >
              <Link href="/settings">
                <Settings className="h-4 w-4 text-[#256DA4] dark:text-[#83B7DE] group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-[#256DA4] dark:text-[#83B7DE] group-hover:text-[#83B7DE] dark:group-hover:text-[#74FF9E] font-medium">
                  Settings
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        {/* Optional: Add version info or user stats */}
        <div className="px-4 py-2 text-center">
          <p className="text-xs text-[#256DA4]/50 dark:text-[#83B7DE]/50">
            v1.0.0
          </p>
        </div>
      </SidebarFooter>
      <SidebarRail className="bg-gradient-to-b from-[#83B7DE]/10 to-[#74FF9E]/10 dark:from-[#74FF9E]/10 dark:to-[#83B7DE]/10" />
    </Sidebar>
  )
}