"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { Swords, UserCheck, ShieldAlert, Loader2, RefreshCw } from 'lucide-react';
import { type NFT } from "@/services/nft"; // Assuming NFT type is defined here

// Mock data for available opponents - replace with actual matchmaking data
interface Opponent {
  id: string;
  username: string;
  avatarUrl: string;
  stakedNft: NFT;
  xp: number;
  matchType: 'casual' | 'ranked';
}

const availableOpponents: Opponent[] = [
  { id: 'opp1', username: 'PepeMaster', avatarUrl: 'https://picsum.photos/seed/pepeMaster/60', stakedNft: { name: 'Rare Pepe', description: 'A very rare pepe indeed.', imageURL: 'https://picsum.photos/seed/rarepepe/60', price: 2.5, xp: 180, battleHistory: ['win', 'win'] }, xp: 180, matchType: 'ranked' },
  { id: 'opp2', username: 'WojakWarrior', avatarUrl: 'https://picsum.photos/seed/wojakWarrior/60', stakedNft: { name: 'Crying Wojak', description: 'It hurts.', imageURL: 'https://picsum.photos/seed/crywojak/60', price: 0.3, xp: 45, battleHistory: ['loss'] }, xp: 45, matchType: 'ranked' },
   { id: 'opp3', username: 'CasualPlayer', avatarUrl: 'https://picsum.photos/seed/casual/60', stakedNft: { name: 'Smiling Doge', description: 'Just for fun.', imageURL: 'https://picsum.photos/seed/smiledoge/60', price: 0.1, xp: 20, battleHistory: [] }, xp: 20, matchType: 'casual' },
   { id: 'opp4', username: 'ChadGamer', avatarUrl: 'https://picsum.photos/seed/chad/60', stakedNft: { name: 'GigaChad Meme', description: 'Yes.', imageURL: 'https://picsum.photos/seed/gigachad/60', price: 5.0, xp: 400, battleHistory: ['win', 'win', 'win'] }, xp: 400, matchType: 'ranked' },
];


export default function JoinMatchPage() {
  const [opponents, setOpponents] = useState<Opponent[]>(availableOpponents);
  const [isLoading, setIsLoading] = useState(false);
  const [challengingId, setChallengingId] = useState<string | null>(null);

  const refreshOpponents = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, fetch new opponents based on user's XP/preferences
    setOpponents([...availableOpponents].sort(() => Math.random() - 0.5)); // Shuffle for demo
    setIsLoading(false);
  };

  const handleChallenge = async (opponentId: string) => {
    setChallengingId(opponentId);
    // Simulate challenge request
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(`Challenged opponent ${opponentId}`);
    alert(`Challenge sent to opponent ${opponentId}! Waiting for response... Redirecting to battle arena.`);
    // TODO: Redirect to battle arena page /battle/[matchId]
    // router.push(`/battle/${newMatchId}`);
    setChallengingId(null);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Find Your Next Battle</h1>
        <Button onClick={refreshOpponents} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Refresh List
        </Button>
      </div>

      {isLoading && opponents.length === 0 && (
        <div className="text-center text-muted-foreground py-10">
           <Loader2 className="mx-auto h-8 w-8 animate-spin mb-4" />
           <p>Searching for opponents...</p>
        </div>
      )}

      {!isLoading && opponents.length === 0 && (
         <div className="text-center text-muted-foreground py-10">
           <p>No opponents found matching your criteria right now. Try adjusting filters or refresh.</p>
           {/* TODO: Add filter options */}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opponents.map((opponent) => (
          <Card key={opponent.id} className="shadow-lg hover:shadow-accent/20 transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-x-4 pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={opponent.avatarUrl} alt={opponent.username} />
                  <AvatarFallback>{opponent.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{opponent.username}</CardTitle>
                  <CardDescription>XP: {opponent.xp}</CardDescription>
                </div>
              </div>
               <Badge variant={opponent.matchType === 'ranked' ? 'destructive' : 'secondary'} className="capitalize">
                 {opponent.matchType}
              </Badge>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm font-semibold mb-2">Staked NFT:</p>
              <Card className="bg-muted/50 p-3 flex items-center gap-3">
                 <Image src={opponent.stakedNft.imageURL} alt={opponent.stakedNft.name} width={40} height={40} className="rounded border" />
                 <div>
                    <p className="text-sm font-medium">{opponent.stakedNft.name}</p>
                    <p className="text-xs text-muted-foreground">XP: {opponent.stakedNft.xp}</p>
                 </div>
                  {opponent.matchType === 'ranked' && <ShieldAlert className="ml-auto h-4 w-4 text-destructive" title="NFT Staked"/>}
              </Card>
              <Button
                className="w-full mt-4 bg-accent hover:bg-accent/90"
                onClick={() => handleChallenge(opponent.id)}
                disabled={challengingId === opponent.id || challengingId !== null}
              >
                {challengingId === opponent.id ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Swords className="mr-2 h-4 w-4" />
                )}
                {challengingId === opponent.id ? 'Challenging...' : 'Challenge'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
