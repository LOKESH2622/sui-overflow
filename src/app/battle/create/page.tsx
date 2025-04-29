"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from 'next/image';
import { type NFT } from "@/services/nft"; // Assuming NFT type is defined here
import { Coins, ShieldCheck, ArrowRight, Info } from 'lucide-react';

// Mock owned NFTs - replace with actual data fetching
const ownedNfts: NFT[] = [
 { name: 'Doge NFT', description: 'Much wow, very NFT.', imageURL: 'https://picsum.photos/seed/doge/100', price: 1.5, xp: 150, battleHistory: ['win', 'loss', 'win', 'win'] },
 { name: 'Pepe NFT', description: 'Feels good man.', imageURL: 'https://picsum.photos/seed/pepe/100', price: 2.0, xp: 120, battleHistory: ['win', 'win', 'loss'] },
 { name: 'Nyan Cat', description: 'Meow meow space.', imageURL: 'https://picsum.photos/seed/nyan/100', price: 3.0, xp: 250, battleHistory: ['win', 'win', 'win', 'win', 'loss'] },
];


export default function CreateMatchPage() {
  const [matchType, setMatchType] = useState<"casual" | "ranked">("casual");
  const [xpRequirement, setXpRequirement] = useState<number>(50);
  const [selectedNft, setSelectedNft] = useState<string | undefined>(undefined);

  const handleCreateMatch = () => {
     if (!selectedNft) {
        alert("Please select an NFT to stake!");
        return;
      }
    console.log("Creating match with settings:", {
      matchType,
      xpRequirement,
      selectedNft,
    });
    alert(`Match created! Type: ${matchType}, XP Req: ${xpRequirement}, Staked NFT: ${selectedNft}`);
    // TODO: Implement actual match creation logic and redirect/update UI
  };

  const selectedNftData = ownedNfts.find(nft => nft.name === selectedNft);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8 flex justify-center">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Battle</CardTitle>
          <CardDescription>Configure your match settings and stake your champion NFT.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          {/* Match Type */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Match Type</Label>
             <RadioGroup defaultValue="casual" onValueChange={(value: "casual" | "ranked") => setMatchType(value)} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="casual" id="casual" />
                <Label htmlFor="casual">Casual (No Stakes)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ranked" id="ranked" />
                <Label htmlFor="ranked">Ranked (NFT Stake)</Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-muted-foreground">
                {matchType === 'casual' ? 'Practice your skills without risking your NFTs.' : 'Stake your NFT - winner takes the opponent\'s staked NFT!'}
            </p>
          </div>

          {/* XP Requirement */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="xp-slider" className="text-lg font-semibold">Minimum Opponent XP</Label>
               <span className="text-sm font-medium text-accent">{xpRequirement} XP</span>
            </div>
             <Slider
                id="xp-slider"
                defaultValue={[50]}
                max={500}
                step={10}
                onValueChange={(value) => setXpRequirement(value[0])}
             />
             <p className="text-sm text-muted-foreground">Set the minimum XP level for opponents you want to face.</p>
          </div>

          {/* NFT Selection */}
          <div className="space-y-3">
             <Label className="text-lg font-semibold">Select Your Champion NFT</Label>
             <Select onValueChange={setSelectedNft} value={selectedNft}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose an NFT to stake..." />
                </SelectTrigger>
                <SelectContent>
                   <SelectGroup>
                    <SelectLabel>Your NFTs</SelectLabel>
                    {ownedNfts.map(nft => (
                       <SelectItem key={nft.name} value={nft.name}>
                         <div className="flex items-center gap-3">
                           <Image src={nft.imageURL} alt={nft.name} width={24} height={24} className="rounded" />
                           <span>{nft.name} (XP: {nft.xp})</span>
                         </div>
                       </SelectItem>
                    ))}
                   </SelectGroup>
                </SelectContent>
              </Select>
             {matchType === 'ranked' && !selectedNft && (
                <p className="text-sm text-destructive">You must select an NFT to stake for ranked matches.</p>
             )}
             {selectedNftData && (
                <Card className="mt-4 bg-muted/50 p-4 flex items-center gap-4">
                    <Image src={selectedNftData.imageURL} alt={selectedNftData.name} width={60} height={60} className="rounded-lg border" />
                    <div>
                        <p className="font-semibold">{selectedNftData.name}</p>
                        <p className="text-sm text-muted-foreground">XP: {selectedNftData.xp}</p>
                        <p className="text-sm text-muted-foreground">Battles: {selectedNftData.battleHistory.length}</p>
                    </div>
                     {matchType === 'ranked' && (
                       <Badge variant="destructive" className="ml-auto flex items-center gap-1">
                         <ShieldCheck className="h-3 w-3"/> STAKED
                       </Badge>
                     )}
                </Card>
             )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleCreateMatch} disabled={matchType === 'ranked' && !selectedNft}>
            Find Opponent <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
