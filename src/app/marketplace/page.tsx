"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { ShoppingCart, Search, ArrowUpDown, Info, BarChartHorizontal } from 'lucide-react';
import { type NFT, listNfts } from "@/services/nft"; // Use the existing service
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

// Mock data fetching - replace with actual service call state management
const initialMarketNfts: NFT[] = [
 { name: 'Ultra Rare Pepe', description: 'Peak Pepe performance.', imageURL: 'https://picsum.photos/seed/ultrapepe/200', price: 10.5, xp: 500, battleHistory: ['win', 'win', 'win'] },
 { name: 'Sad Cat', description: 'Why so blue?', imageURL: 'https://picsum.photos/seed/sadcat/200', price: 0.2, xp: 30, battleHistory: ['loss', 'loss'] },
 { name: 'Stonks Guy', description: 'To the moon!', imageURL: 'https://picsum.photos/seed/stonks/200', price: 1.8, xp: 110, battleHistory: ['win', 'loss'] },
 { name: 'Distracted Boyfriend', description: 'Classic template.', imageURL: 'https://picsum.photos/seed/distracted/200', price: 0.7, xp: 65, battleHistory: ['win'] },
  // Include some from the 'owned' list to simulate them being on the market
 { name: 'Doge NFT', description: 'Much wow, very NFT.', imageURL: 'https://picsum.photos/seed/doge/200', price: 1.6, xp: 150, battleHistory: ['win', 'loss', 'win', 'win'] },
 { name: 'Grumpy Cat', description: 'I had fun once. It was awful.', imageURL: 'https://picsum.photos/seed/grumpy/200', price: 0.9, xp: 80, battleHistory: ['loss', 'loss'] },
];

export default function Marketplace() {
  const [marketNfts, setMarketNfts] = useState<NFT[]>(initialMarketNfts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof NFT | 'default'>("price"); // Default sort by price
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Default asc for price
  const [selectedNft, setSelectedNft] = useState<NFT | null>(null);

  const filteredAndSortedNfts = useMemo(() => {
    let filtered = marketNfts.filter(nft =>
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy !== 'default') {
      filtered.sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        let comparison = 0;
        if (typeof valA === 'number' && typeof valB === 'number') comparison = valA - valB;
        else if (typeof valA === 'string' && typeof valB === 'string') comparison = valA.localeCompare(valB);
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }
    return filtered;
  }, [marketNfts, searchTerm, sortBy, sortOrder]);

  const toggleSortOrder = () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');

  const handleBuyNft = (nft: NFT) => {
    console.log(`Attempting to buy ${nft.name} for ${nft.price} ETH`);
    // TODO: Implement wallet connection and transaction logic
    alert(`Connect wallet to buy ${nft.name}. Est. Gas Fee: 0.005 ETH`);
    // Close dialog after purchase attempt? Maybe show success/failure toast.
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Meme Marketplace</h1>

      {/* Filtering and Sorting Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search NFTs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 items-center">
          <Select onValueChange={(value) => setSortBy(value as keyof NFT | 'default')} defaultValue="price">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="xp">XP</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              {/* Add rarity, popularity if available */}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" onClick={toggleSortOrder} disabled={sortBy === 'default'}>
            <ArrowUpDown className="h-4 w-4" />
             <span className="sr-only">Toggle sort order ({sortOrder})</span>
          </Button>
        </div>
      </div>

      {/* NFT Grid */}
      <Dialog>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAndSortedNfts.map((nft, index) => (
             <DialogTrigger asChild key={index} onClick={() => setSelectedNft(nft)}>
               <Card className="overflow-hidden shadow-lg hover:shadow-accent/30 transition-shadow duration-300 cursor-pointer flex flex-col">
                <CardHeader className="p-0 relative">
                  <Image
                    src={nft.imageURL}
                    alt={nft.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                   <Badge variant="secondary" className="absolute top-2 left-2 bg-black/50 text-white">{nft.price.toFixed(2)} ETH</Badge>
                   <Badge className="absolute top-2 right-2" variant={nft.xp > 200 ? "destructive" : nft.xp > 100 ? "default" : "secondary"}>
                     XP: {nft.xp}
                   </Badge>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg mb-1 truncate">{nft.name}</CardTitle>
                  <p className="text-sm text-muted-foreground h-10 overflow-hidden text-ellipsis">{nft.description}</p>
                </CardContent>
                <CardFooter className="p-2">
                   <Button size="sm" variant="outline" className="w-full" >
                      <Info className="mr-2 h-4 w-4"/> View Details
                   </Button>
                </CardFooter>
              </Card>
            </DialogTrigger>
          ))}
        </div>

        {/* NFT Detail Dialog */}
        <DialogContent className="sm:max-w-[600px] bg-card">
            {selectedNft && (
             <>
               <DialogHeader>
                 <DialogTitle className="text-2xl">{selectedNft.name}</DialogTitle>
                 <DialogDescription>{selectedNft.description}</DialogDescription>
               </DialogHeader>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  <div className="flex justify-center items-center">
                     <Image
                       src={selectedNft.imageURL}
                       alt={selectedNft.name}
                       width={250}
                       height={250}
                       className="rounded-lg border shadow-lg"
                     />
                  </div>
                  <div className="space-y-4">
                    <div>
                       <h4 className="font-semibold text-lg mb-2">Stats</h4>
                       <div className="space-y-1 text-sm">
                          <p><strong>Price:</strong> <span className="text-accent font-bold">{selectedNft.price.toFixed(2)} ETH</span></p>
                          <p><strong>XP Level:</strong> {selectedNft.xp}</p>
                       </div>
                    </div>
                     <div>
                       <h4 className="font-semibold text-lg mb-2 flex items-center gap-2"><BarChartHorizontal className="h-5 w-5"/> Battle History</h4>
                       {selectedNft.battleHistory.length > 0 ? (
                         <div className="text-sm space-y-1 max-h-24 overflow-y-auto pr-2">
                            <p>Total Battles: {selectedNft.battleHistory.length}</p>
                            <p>Wins: {selectedNft.battleHistory.filter(r => r === 'win').length}</p>
                            <p>Losses: {selectedNft.battleHistory.filter(r => r === 'loss').length}</p>
                           {/* Could list recent results */}
                         </div>
                       ) : (
                         <p className="text-sm text-muted-foreground">No battles recorded yet.</p>
                       )}
                     </div>
                     {/* Add Owner Info if available */}
                  </div>
               </div>
               <DialogFooter className="sm:justify-start">
                  <Button type="button" onClick={() => handleBuyNft(selectedNft)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                     <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now ({selectedNft.price.toFixed(2)} ETH)
                  </Button>
                  <DialogClose asChild>
                     <Button type="button" variant="secondary">
                       Close
                     </Button>
                  </DialogClose>
               </DialogFooter>
             </>
           )}
         </DialogContent>
      </Dialog>

       {filteredAndSortedNfts.length === 0 && (
         <p className="text-center text-muted-foreground mt-12">No NFTs found matching your criteria. Check back later!</p>
       )}
    </div>
  );
}

