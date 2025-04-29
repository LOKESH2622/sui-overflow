"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { Swords, Store, Info, Search, ArrowUpDown } from 'lucide-react';
import { type NFT, listNfts } from "@/services/nft"; // Use the existing service

// Mock data fetching - replace with actual service call state management (e.g., react-query)
// We'll use a simple state management for this example.
const initialNfts: NFT[] = [
  { name: 'Doge NFT', description: 'Much wow, very NFT.', imageURL: 'https://picsum.photos/seed/doge/200', price: 1.5, xp: 150, battleHistory: ['win', 'loss', 'win', 'win'] },
  { name: 'Pepe NFT', description: 'Feels good man.', imageURL: 'https://picsum.photos/seed/pepe/200', price: 2.0, xp: 120, battleHistory: ['win', 'win', 'loss'] },
  { name: 'Grumpy Cat', description: 'I had fun once. It was awful.', imageURL: 'https://picsum.photos/seed/grumpy/200', price: 0.8, xp: 80, battleHistory: ['loss', 'loss'] },
  { name: 'Nyan Cat', description: 'Meow meow space.', imageURL: 'https://picsum.photos/seed/nyan/200', price: 3.0, xp: 250, battleHistory: ['win', 'win', 'win', 'win', 'loss'] },
  { name: 'Wojak', description: 'That feel when...', imageURL: 'https://picsum.photos/seed/wojak/200', price: 0.5, xp: 50, battleHistory: ['loss'] },
  // Add more mock NFTs
];

export default function Collection() {
  const [nfts, setNfts] = useState<NFT[]>(initialNfts); // In a real app, fetch this
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof NFT | 'default'>("default");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // default to desc for XP/price

  const filteredAndSortedNfts = useMemo(() => {
    let filtered = nfts.filter(nft =>
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy !== 'default') {
      filtered.sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];

        let comparison = 0;
        if (typeof valA === 'number' && typeof valB === 'number') {
          comparison = valA - valB;
        } else if (typeof valA === 'string' && typeof valB === 'string') {
          comparison = valA.localeCompare(valB);
        }
        // Add more type checks if needed (e.g., dates)

        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [nfts, searchTerm, sortBy, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }

  // TODO: Implement actions
  const handleUseInBattle = (nftName: string) => console.log(`Use ${nftName} in battle`);
  const handleListOnMarketplace = (nftName: string) => console.log(`List ${nftName} on marketplace`);
  const handleViewDetails = (nftName: string) => console.log(`View details for ${nftName}`); // Could open a modal

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">My Meme Collection</h1>

      {/* Filtering and Sorting Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 items-center">
           <Select onValueChange={(value) => setSortBy(value as keyof NFT | 'default')} defaultValue="default">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="xp">XP</SelectItem>
              <SelectItem value="price">Price (Estimated)</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              {/* Add more sort options like acquisition date if available */}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" onClick={toggleSortOrder} disabled={sortBy === 'default'}>
             <ArrowUpDown className="h-4 w-4" />
             <span className="sr-only">Toggle sort order ({sortOrder})</span>
          </Button>
        </div>
      </div>

      {/* NFT Grid */}
      {filteredAndSortedNfts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAndSortedNfts.map((nft, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-accent/30 transition-shadow duration-300 flex flex-col">
              <CardHeader className="p-0 relative">
                 <Image
                    src={nft.imageURL}
                    alt={nft.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover" // Ensure consistent image size
                 />
                 <Badge className="absolute top-2 right-2" variant={nft.xp > 100 ? "default" : "secondary"}>
                   XP: {nft.xp}
                 </Badge>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg mb-2 truncate">{nft.name}</CardTitle>
                <p className="text-sm text-muted-foreground h-10 overflow-hidden text-ellipsis">{nft.description}</p>
                <p className="text-xs mt-2">Battles: {nft.battleHistory.length} ({nft.battleHistory.filter(r => r === 'win').length}W / {nft.battleHistory.filter(r => r === 'loss').length}L)</p>
              </CardContent>
              <CardFooter className="p-2 grid grid-cols-3 gap-1">
                <Button size="sm" variant="ghost" onClick={() => handleUseInBattle(nft.name)} title="Use in Battle">
                  <Swords className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleListOnMarketplace(nft.name)} title="List on Marketplace">
                   <Store className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleViewDetails(nft.name)} title="View Details">
                  <Info className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-12">No NFTs found matching your criteria. Time to hit the marketplace or create some memes!</p>
      )}
    </div>
  );
}

