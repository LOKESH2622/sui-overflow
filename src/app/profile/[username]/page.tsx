"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Crown, BarChart, CalendarDays, Loader2, ShieldX } from 'lucide-react';
import { type NFT } from "@/services/nft"; // Assuming NFT type is defined here

// Mock Data Structure for a public profile - replace with actual data fetching based on username
interface PublicProfileData {
  username: string;
  avatarUrl: string;
  joinDate: string; // e.g., "2024-01-15"
  totalXp: number;
  level: number;
  winLossRecord: string; // e.g., "55 Wins / 23 Losses"
  ownedNfts: NFT[];
  recentActivity: Array<{ id: number; description: string; time: string; type: 'win' | 'loss' | 'acquired' }>;
}

// Mock function to simulate fetching profile data
const fetchPublicProfile = async (username: string): Promise<PublicProfileData | null> => {
  console.log(`Fetching public profile for ${username}`);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  // Example data - in reality, fetch from your backend
  if (username === "MemeLord69") {
    return {
      username: "MemeLord69",
      avatarUrl: "https://picsum.photos/seed/memelord/100",
      joinDate: "2024-01-15",
      totalXp: 1337,
      level: 12,
      winLossRecord: "42 Wins / 18 Losses",
      ownedNfts: [
        { name: 'Doge NFT', description: 'Much wow, very NFT.', imageURL: 'https://picsum.photos/seed/doge/150', price: 1.5, xp: 150, battleHistory: ['win', 'loss', 'win', 'win'] },
        { name: 'Nyan Cat', description: 'Meow meow space.', imageURL: 'https://picsum.photos/seed/nyan/150', price: 3.0, xp: 250, battleHistory: ['win', 'win', 'win', 'win', 'loss'] },
        { name: 'Wojak', description: 'That feel when...', imageURL: 'https://picsum.photos/seed/wojak/150', price: 0.5, xp: 50, battleHistory: ['loss'] },
         // Add a few more...
        { name: 'Sad Cat', description: 'Why so blue?', imageURL: 'https://picsum.photos/seed/sadcat/150', price: 0.2, xp: 30, battleHistory: ['loss', 'loss'] },

      ],
      recentActivity: [
        { id: 1, description: "Defeated PepeMaster", time: "5m ago", type: 'win' },
        { id: 2, description: "Acquired 'Legendary Doge'", time: "1h ago", type: 'acquired' },
        { id: 3, description: "Lost to WojakWarrior", time: "5h ago", type: 'loss' },
      ],
    };
  } else if (username === "PepeMaster") {
       return {
           username: "PepeMaster",
           avatarUrl: "https://picsum.photos/seed/pepeMaster/100",
           joinDate: "2023-11-20",
           totalXp: 850,
           level: 9,
           winLossRecord: "30 Wins / 10 Losses",
           ownedNfts: [
                { name: 'Rare Pepe', description: 'A very rare pepe indeed.', imageURL: 'https://picsum.photos/seed/rarepepe/150', price: 2.5, xp: 180, battleHistory: ['win', 'win'] },
                { name: 'Smug Pepe', description: 'He knows.', imageURL: 'https://picsum.photos/seed/smugpepe/150', price: 1.2, xp: 90, battleHistory: ['win', 'loss'] },
           ],
           recentActivity: [
               { id: 4, description: "Lost to MemeLord69", time: "5m ago", type: 'loss' },
               { id: 5, description: "Acquired 'Smug Pepe'", time: "2d ago", type: 'acquired' },
           ],
       };
  }
  return null; // Profile not found
};


export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [profileData, setProfileData] = useState<PublicProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (username) {
      setIsLoading(true);
      fetchPublicProfile(username)
        .then(data => {
          setProfileData(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch public profile:", err);
          setIsLoading(false);
        });
    }
  }, [username]);

   if (isLoading) {
    return <div className="flex justify-center items-center h-[calc(100vh-8rem)]"><Loader2 className="h-12 w-12 animate-spin text-accent" /></div>;
  }

  if (!profileData) {
    return (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-8rem)] text-center">
            <ShieldX className="h-16 w-16 text-destructive mb-4"/>
            <h2 className="text-2xl font-semibold">Profile Not Found</h2>
            <p className="text-muted-foreground">The user '{username}' does not exist or their profile is private.</p>
        </div>
    );
  }

  const { avatarUrl, joinDate, totalXp, level, winLossRecord, ownedNfts, recentActivity } = profileData;
  const joinDateFormatted = new Date(joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Info & Stats */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="items-center text-center">
               <Avatar className="h-24 w-24 mb-4 border-4 border-primary mx-auto">
                <AvatarImage src={avatarUrl} alt={username} />
                <AvatarFallback className="text-3xl">{username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-3xl">{username}</CardTitle>
               <CardDescription className="flex items-center justify-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4"/> Joined {joinDateFormatted}
               </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <Separator />
               <div className="flex justify-between items-center">
                 <span className="font-semibold">Level</span>
                 <Badge variant="default" className="text-lg">{level}</Badge>
               </div>
               <div className="flex justify-between items-center">
                 <span className="font-semibold">Total XP</span>
                 <Badge variant="secondary">{totalXp}</Badge>
               </div>
               <Separator />
               <div className="text-center space-y-1">
                  <p className="font-semibold text-lg flex items-center justify-center gap-2"><BarChart className="h-5 w-5"/> Battle Record</p>
                  <p className="text-muted-foreground">{winLossRecord}</p>
               </div>
            </CardContent>
          </Card>

           <Card className="shadow-lg">
             <CardHeader>
               <CardTitle>Recent Activity</CardTitle>
               <CardDescription>Latest matches and acquisitions.</CardDescription>
             </CardHeader>
             <CardContent>
               <ScrollArea className="h-[200px] pr-3">
                 <div className="space-y-3">
                   {recentActivity.map((activity) => (
                     <div key={activity.id} className="flex items-start space-x-3 text-sm">
                       <div className="flex-shrink-0 mt-0.5">
                          {activity.type === 'win' && <Crown className="h-4 w-4 text-green-500" />}
                          {activity.type === 'loss' && <Crown className="h-4 w-4 text-destructive" style={{transform: 'rotate(180deg)'}} />}
                          {activity.type === 'acquired' && <Badge variant="outline" className="text-xs px-1 py-0">NFT</Badge>}
                       </div>
                       <div>
                         <p>{activity.description}</p>
                         <p className="text-xs text-muted-foreground">{activity.time}</p>
                       </div>
                     </div>
                   ))}
                    {recentActivity.length === 0 && <p className="text-sm text-muted-foreground text-center">No recent activity.</p>}
                 </div>
               </ScrollArea>
             </CardContent>
           </Card>
        </div>

        {/* Right Column: Trophy Room (NFT Collection) */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-2xl">Trophy Room</CardTitle>
              <CardDescription>Collection of {username}'s mighty meme NFTs.</CardDescription>
            </CardHeader>
            <CardContent>
               {ownedNfts.length > 0 ? (
                 <ScrollArea className="h-[600px] p-1"> {/* Adjust height as needed */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                     {ownedNfts.map((nft, index) => (
                       <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow border">
                         <Image
                           src={nft.imageURL}
                           alt={nft.name}
                           width={150}
                           height={150}
                           className="w-full h-32 object-cover"
                         />
                          <div className="p-2 text-center">
                           <p className="text-sm font-semibold truncate">{nft.name}</p>
                           <Badge variant="secondary" className="text-xs mt-1">XP: {nft.xp}</Badge>
                         </div>
                       </Card>
                     ))}
                   </div>
                 </ScrollArea>
               ) : (
                  <p className="text-center text-muted-foreground py-10">This player hasn't collected any NFTs yet.</p>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

