"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger, // For desktop collapse/expand
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, Swords, Store, Users, Trophy, ShieldQuestion, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/collection", label: "My Collection", icon: Trophy },
  { href: "/battle", label: "Battle Arena", icon: Swords },
  { href: "/marketplace", label: "Marketplace", icon: Store },
  { href: "/profile/MemeLord69", label: "My Profile", icon: Users }, // Example link, replace with dynamic username
];

const secondaryNavItems = [
   { href: "/guide", label: "How to Play", icon: ShieldQuestion },
   { href: "/settings", label: "Settings", icon: Settings },
];

export default function SidebarNav() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        // Handle exact match for dashboard, broader match for others
        if (href === "/dashboard") return pathname === href;
        return pathname.startsWith(href);
    };


  return (
    <>
      <SidebarHeader className="flex items-center justify-between p-2">
        {/* Logo/Title for collapsed state (optional) */}
        <span className="text-lg font-semibold text-primary group-data-[collapsible=icon]:hidden">
           Meme Royale
        </span>
         {/* Desktop trigger inside sidebar */}
         <div className="hidden md:block">
            <SidebarTrigger />
         </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                 <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={{ children: item.label, side: "right" }}
                 >
                   <a>
                     <item.icon />
                     <span>{item.label}</span>
                   </a>
                 </SidebarMenuButton>
               </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 mt-auto">
        <SidebarMenu>
            {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                        asChild
                        variant="ghost"
                        isActive={isActive(item.href)}
                        tooltip={{ children: item.label, side: "right" }}
                    >
                    <a>
                        <item.icon />
                        <span>{item.label}</span>
                    </a>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
             <SidebarSeparator />
            <SidebarMenuItem>
                 <SidebarMenuButton variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive" tooltip={{ children: "Logout", side: "right" }}>
                    <LogOut />
                    <span>Logout</span>
                 </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

