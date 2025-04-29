"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, User, Settings, Wallet } from "lucide-react";

// Mock user data - replace with actual auth state
const user = {
  name: "MemeLord69",
  avatarUrl: "https://picsum.photos/seed/memelord/40",
  email: "memelord@example.com", // Optional
};

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
        {/* Mobile Sidebar Trigger */}
       <div className="md:hidden">
          <SidebarTrigger />
       </div>

       {/* Placeholder for Logo or Title - Optional */}
       <div className="hidden md:block font-mono text-lg font-semibold tracking-tight text-primary">
         <Link href="/dashboard">Meme Royale</Link>
       </div>


       <div className="relative ml-auto flex-1 md:grow-0">
          {/* Future search bar could go here */}
       </div>

       {/* Wallet Connect Button - Conditional */}
       {/* Replace with actual wallet connection logic */}
       <Button variant="outline" size="sm" className="hidden sm:inline-flex">
         <Wallet className="mr-2 h-4 w-4" />
         Connect Wallet
       </Button>


       <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button
             variant="outline"
             size="icon"
             className="overflow-hidden rounded-full"
           >
              <Avatar className="h-8 w-8">
                 <AvatarImage src={user.avatarUrl} alt={user.name} />
                 <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
           </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
           <DropdownMenuLabel>My Account</DropdownMenuLabel>
           <DropdownMenuSeparator />
           <DropdownMenuItem asChild>
             <Link href={`/profile/${user.name}`}><User className="mr-2 h-4 w-4"/> Profile</Link>
           </DropdownMenuItem>
           <DropdownMenuItem><Settings className="mr-2 h-4 w-4"/> Settings</DropdownMenuItem>
            <DropdownMenuItem><Wallet className="mr-2 h-4 w-4"/> Manage Wallet</DropdownMenuItem>
           <DropdownMenuSeparator />
           <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
              <LogOut className="mr-2 h-4 w-4"/> Logout
           </DropdownMenuItem>
         </DropdownMenuContent>
       </DropdownMenu>
    </header>
  );
}
