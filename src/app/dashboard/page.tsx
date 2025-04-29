import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { Swords, PlusCircle, Store, ShieldQuestion, Users, Crown, BarChart } from 'lucide-react';
import Image from 'next/image';

// Mock data - replace with actual data fetching
const playerStats = {
  username: "MemeLord69",
  xp: 1337,
  level: 12,
  winLossRecord: "42 Wins / 18 Losses",
  nftCollectionCount: 25,
  avatarUrl: "https://picsum.photos/seed/memelord/100", // Placeholder avatar
};

const activityFeed = [
  { id: 1, type: "match_win", description: "You defeated PepeMaster in a duel!", time: "5m ago" },
  { id: 2, type: "nft_acquired", description: "Acquired 'Legendary Doge' NFT.", time: "1h ago" },
  { id: 3, type: "tournament_join", description: "Joined the 'Weekend Meme Madness' tournament.", time: "3h ago" },
  { id: 4, type: "match_loss", description: "Lost a close battle against WojakWarrior.", time: "5h ago" },
  { id: 5, type: "nft_listed", description: "Listed 'Grumpy Cat' NFT on the marketplace.", time: "1d ago" },
];

const featuredTournaments = [
  { id: 1, name: "Weekend Meme Madness", prize: "1 ETH + Rare NFT", time: "Starts Sat 12:00 PM", img: "https://picsum.photos/seed/tourney1/300/150" },
  { id: 2, name: "Beginner's Brawl", prize: "0.1 ETH + 5 Common NFTs", time: "Ongoing", img: "https://picsum.photos/seed/tourney2/300/150" },
  { id: 3, name: "High Stakes Showdown", prize: "5 ETH + Legendary NFT", time: "Starts Next Week", img: "https://picsum.photos/seed/tourney3/300/150" },
];

export default function Dashboard() {
  const xpToNextLevel = 1500; // Example value
  const xpProgress = (playerStats.xp / xpToNextLevel) * 100;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Player Stats & Quick Access */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center space-x-4 pb-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={playerStats.avatarUrl} alt={playerStats.username} />
                <AvatarFallback className="text-xl">{playerStats.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{playerStats.username}</CardTitle>
                <CardDescription>Level {playerStats.level}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span>XP</span>
                <Badge variant="secondary">{playerStats.xp} / {xpToNextLevel}</Badge>
              </div>
               {/* Basic Progress Bar for XP */}
               <div className="w-full bg-muted rounded-full h-2.5 dark:bg-gray-700">
                 <div className="bg-accent h-2.5 rounded-full" style={{ width: `${xpProgress}%` }}></div>
               </div>
               <Separator />
              <div className="flex justify-between">
                <span>Win/Loss Record</span>
                <span className="font-medium">{playerStats.winLossRecord}</span>
              </div>
               <Separator />
              <div className="flex justify-between">
                <span>NFT Collection</span>
                <span className="font-medium">{playerStats.nftCollectionCount} NFTs</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline">
                <Link href="/battle/create"><PlusCircle className="mr-2 h-4 w-4" /> Create Match</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/battle/join"><Swords className="mr-2 h-4 w-4" /> Join Match</Link>
              </Button>
              <Button asChild variant="outline">
                 <Link href="/marketplace"><Store className="mr-2 h-4 w-4" /> Marketplace</Link>
              </Button>
               <Button asChild variant="ghost" className="text-muted-foreground">
                 <Link href="/guide"><ShieldQuestion className="mr-2 h-4 w-4" /> How to Play</Link>
               </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Activity Feed & Featured Tournaments */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>Your recent actions and results.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {activityFeed.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                       <div className="flex-shrink-0 mt-1">
                          {activity.type === 'match_win' && <Crown className="h-5 w-5 text-green-500" />}
                          {activity.type === 'match_loss' && <Crown className="h-5 w-5 text-destructive" style={{transform: 'rotate(180deg)'}} />}
                          {activity.type === 'nft_acquired' && <PlusCircle className="h-5 w-5 text-blue-500" />}
                          {activity.type === 'tournament_join' && <Users className="h-5 w-5 text-purple-500" />}
                          {activity.type === 'nft_listed' && <Store className="h-5 w-5 text-orange-500" />}
                       </div>
                      <div>
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Featured Tournaments</CardTitle>
              <CardDescription>Join the fray and win big!</CardDescription>
            </CardHeader>
            <CardContent>
               {/* Simple Carousel Placeholder - Actual implementation might need a library */}
               <div className="flex space-x-4 overflow-x-auto pb-4">
                {featuredTournaments.map((tournament) => (
                  <Card key={tournament.id} className="min-w-[280px] flex-shrink-0 hover:shadow-accent/20 hover:shadow-md transition-shadow">
                    <Image
                      src={tournament.img}
                      alt={tournament.name}
                      width={300}
                      height={150}
                      className="rounded-t-lg object-cover w-full h-[100px]"
                    />
                    <CardHeader className="p-3">
                      <CardTitle className="text-base">{tournament.name}</CardTitle>
                      <CardDescription className="text-xs">{tournament.prize}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                       <Badge variant="secondary" className="text-xs">{tournament.time}</Badge>
                       <Button size="sm" className="w-full mt-2 bg-accent hover:bg-accent/90">Join Now</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
