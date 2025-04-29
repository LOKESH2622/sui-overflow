"use client"; // Add this directive

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';
import { Rocket, Zap, Trophy } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 dark text-foreground">
      <section className="w-full max-w-4xl text-center py-12 md:py-24">
        <div className="mb-12 flex justify-center">
          {/* Placeholder for meme battle visual - Using a static SVG or a simple placeholder */}
           <div className="w-[400px] h-[300px] bg-muted rounded-lg shadow-lg flex items-center justify-center">
             <Zap className="w-24 h-24 text-accent animate-pulse" /> {/* Example Icon */}
           </div>
          {/* <Image
            src="/placeholder-meme-battle.svg" // Requires the actual SVG file at public/placeholder-meme-battle.svg
            alt="Meme NFTs Battling"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
          /> */}
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text animate-gradient-x">
          Meme Royale
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Where Memes Become Legends. Battle, Collect, and Rule the Arena!
        </p>
        <div className="space-x-4">
           <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground animate-bounce-short">
            <Link href="/dashboard">Enter Arena <Rocket className="ml-2" /></Link>
          </Button>
          <Button variant="outline" size="lg">
            Connect Wallet <Zap className="ml-2" />
          </Button>
        </div>
      </section>

      <section className="w-full max-w-5xl py-16" id="how-it-works">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <Trophy className="mx-auto h-12 w-12 text-accent mb-4" />
              <CardTitle>1. Collect & Create</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Mint your first meme NFT or grab powerful ones from the marketplace. Build your arsenal!
              </CardDescription>
            </CardContent>
          </Card>
           <Card className="text-center bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <Zap className="mx-auto h-12 w-12 text-accent mb-4" />
              <CardTitle>2. Battle & Stake</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Challenge opponents, stake your NFTs in epic duels, and climb the leaderboards.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center bg-card/80 backdrop-blur-sm">
            <CardHeader>
               <Rocket className="mx-auto h-12 w-12 text-accent mb-4" />
              <CardTitle>3. Win & Earn</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Defeat rivals to win their staked NFTs, earn valuable XP, and prove your meme mastery.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }

        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-short {
          animation: bounce-short 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
