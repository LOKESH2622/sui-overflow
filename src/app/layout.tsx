import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import Header from "@/components/layout/Header";
import SidebarNav from "@/components/layout/SidebarNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meme Royale",
  description: "NFT-Based Meme Battle Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased font-sans`,
          "min-h-screen bg-background"
        )}
      >
        <SidebarProvider defaultOpen>
          <Sidebar variant="sidebar" collapsible="icon">
            <SidebarNav />
          </Sidebar>
          <SidebarInset className="flex flex-col">
             <Header />
             <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
               {children}
             </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
