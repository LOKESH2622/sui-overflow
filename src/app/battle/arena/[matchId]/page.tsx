"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import { Swords, ShieldCheck, Crown, XCircle, Zap, Loader2 } from 'lucide-react';
import { type NFT } from "@/services/nft"; // Assuming NFT type is defined here
import { Label } from '@/components/ui/label'; // Added import
import { Badge } from '@/components/ui/badge'; // Added import

// Mock Data Structure for a match - replace with actual data fetching based on matchId
interface MatchDetails {
  matchId: string;
  player1: { username: string; avatarUrl: string; nft: NFT; health: number; };
  player2: { username: string; avatarUrl: string; nft: NFT; health: number; };
  status: 'ongoing' | 'finished';
  winner?: string; // username of the winner
}

// Mock function to simulate fetching match data
const fetchMatchDetails = async (matchId: string): Promise<MatchDetails | null> => {
  console.log(`Fetching details for match ${matchId}`);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  // Example data - in reality, fetch from your backend/blockchain
  if (matchId === "mock-match-123") {
    return {
      matchId: "mock-match-123",
      player1: { username: "MemeLord69", avatarUrl: "https://picsum.photos/seed/memelord/100", nft: { name: 'Nyan Cat', description: 'Meow meow space.', imageURL: 'https://picsum.photos/seed/nyan/200', price: 3.0, xp: 250, battleHistory: ['win'] }, health: 100 },
      player2: { username: "PepeMaster", avatarUrl: "https://picsum.photos/seed/pepeMaster/100", nft: { name: 'Rare Pepe', description: 'A very rare pepe indeed.', imageURL: 'https://picsum.photos/seed/rarepepe/200', price: 2.5, xp: 180, battleHistory: ['loss'] }, health: 100 },
      status: 'ongoing',
    };
  }
  return null; // Match not found
};

// Mock function to simulate battle progression
const simulateBattleTurn = (match: MatchDetails): MatchDetails => {
   if (match.status !== 'ongoing') return match;

   const p1Damage = Math.floor(Math.random() * 15) + 5; // Random damage 5-19
   const p2Damage = Math.floor(Math.random() * 15) + 5;

   const newP1Health = Math.max(0, match.player1.health - p2Damage);
   const newP2Health = Math.max(0, match.player2.health - p1Damage);

   let newStatus: 'ongoing' | 'finished' = 'ongoing';
   let winner: string | undefined = undefined;

   if (newP1Health === 0 && newP2Health === 0) {
     newStatus = 'finished'; // Draw (handle this case better if needed)
   } else if (newP1Health === 0) {
     newStatus = 'finished';
     winner = match.player2.username;
   } else if (newP2Health === 0) {
     newStatus = 'finished';
     winner = match.player1.username;
   }

   console.log(`${match.player1.username} dealt ${p1Damage}, ${match.player2.username} dealt ${p2Damage}. Winner: ${winner}`);


   return {
     ...match,
     player1: { ...match.player1, health: newP1Health },
     player2: { ...match.player2, health: newP2Health },
     status: newStatus,
     winner: winner,
   };
};


export default function BattleArenaPage() {
  const params = useParams();
  const matchId = params.matchId as string;
  const [matchDetails, setMatchDetails] = useState<MatchDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  useEffect(() => {
    if (matchId) {
      setIsLoading(true);
      fetchMatchDetails(matchId)
        .then(data => {
          setMatchDetails(data);
          setIsLoading(false);
           if (data?.status === 'ongoing') {
              setBattleLog(['Match Started!']);
           } else if (data?.status === 'finished') {
               setBattleLog([`Match Finished! Winner: ${data.winner}`]);
           }
        })
        .catch(err => {
          console.error("Failed to fetch match details:", err);
          setIsLoading(false);
          // Handle error state
        });
    }
  }, [matchId]);

  // Battle simulation interval
   useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (matchDetails && matchDetails.status === 'ongoing') {
      intervalId = setInterval(() => {
        setMatchDetails(prevDetails => {
          if (!prevDetails || prevDetails.status !== 'ongoing') {
             if(intervalId) clearInterval(intervalId);
             return prevDetails;
          }
          const nextTurnDetails = simulateBattleTurn(prevDetails);
          // Add to battle log (simplified)
          setBattleLog(prevLog => [...prevLog, `Turn ${prevLog.length}: ${prevDetails.player1.username} HP ${nextTurnDetails.player1.health}, ${prevDetails.player2.username} HP ${nextTurnDetails.player2.health}`]);

          if (nextTurnDetails.status === 'finished') {
              if(intervalId) clearInterval(intervalId);
               setBattleLog(prevLog => [...prevLog, `Match Over! Winner: ${nextTurnDetails.winner}`]);
          }
          return nextTurnDetails;
        });
      }, 2000); // Simulate a turn every 2 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
   }, [matchDetails?.status]); // Rerun effect if status changes


  if (isLoading) {
    return <div className="flex justify-center items-center h-[calc(100vh-8rem)]"><Loader2 className="h-12 w-12 animate-spin text-accent" /></div>;
  }

  if (!matchDetails) {
    return <div className="text-center py-20 text-destructive">Match not found or failed to load.</div>;
  }

  const { player1, player2, status, winner } = matchDetails;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-2 text-center">Battle Arena</h1>
      <p className="text-muted-foreground text-center mb-8">Match ID: {matchId}</p>

      {/* Battle Visualization Area */}
      <div className="grid grid-cols-3 gap-4 items-center mb-12 p-6 bg-card rounded-lg shadow-xl relative overflow-hidden">
         {/* Player 1 Card */}
         <Card className="text-center relative z-10 animate-slide-in-left">
          <CardHeader className="items-center">
             <Avatar className="h-16 w-16 mb-2 border-2 border-blue-500">
               <AvatarImage src={player1.avatarUrl} alt={player1.username} />
               <AvatarFallback>{player1.username.substring(0, 2).toUpperCase()}</AvatarFallback>
             </Avatar>
            <CardTitle>{player1.username}</CardTitle>
             <Image src={player1.nft.imageURL} alt={player1.nft.name} width={120} height={120} className="rounded-lg my-2 border" />
             <p className="font-semibold text-sm">{player1.nft.name}</p>
             <Badge variant="secondary">XP: {player1.nft.xp}</Badge>
          </CardHeader>
          <CardContent>
            <Label>Health</Label>
            <Progress value={player1.health} className="h-3 [&>div]:bg-green-500 mt-1" />
            <span className="text-xs">{player1.health}/100</span>
          </CardContent>
        </Card>

        {/* VS / Status Area */}
        <div className="text-center relative z-10">
          {status === 'ongoing' ? (
             <>
                <Zap className="h-16 w-16 text-accent mx-auto mb-4 animate-pulse" />
                <p className="text-2xl font-bold text-accent">FIGHT!</p>
             </>
          ) : (
            <div className="space-y-4">
              {winner === player1.username && <Crown className="h-16 w-16 text-yellow-400 mx-auto" />}
              {winner === player2.username && <Crown className="h-16 w-16 text-yellow-400 mx-auto" />}
              {!winner && <XCircle className="h-16 w-16 text-muted-foreground mx-auto" />} {/* Draw */}
              <p className="text-2xl font-bold">Match Over</p>
            </div>
          )}
        </div>

        {/* Player 2 Card */}
        <Card className="text-center relative z-10 animate-slide-in-right">
           <CardHeader className="items-center">
             <Avatar className="h-16 w-16 mb-2 border-2 border-red-500">
               <AvatarImage src={player2.avatarUrl} alt={player2.username} />
               <AvatarFallback>{player2.username.substring(0, 2).toUpperCase()}</AvatarFallback>
             </Avatar>
            <CardTitle>{player2.username}</CardTitle>
            <Image src={player2.nft.imageURL} alt={player2.nft.name} width={120} height={120} className="rounded-lg my-2 border" />
             <p className="font-semibold text-sm">{player2.nft.name}</p>
             <Badge variant="secondary">XP: {player2.nft.xp}</Badge>
          </CardHeader>
          <CardContent>
             <Label>Health</Label>
            <Progress value={player2.health} className="h-3 [&>div]:bg-green-500 mt-1" />
            <span className="text-xs">{player2.health}/100</span>
          </CardContent>
        </Card>

        {/* Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-red-900/30 opacity-50 z-0"></div>

      </div>

      {/* Results / Log Area */}
      {status === 'finished' && (
        <Card className="mb-8 text-center shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">Battle Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {winner ? (
              <>
                 <Crown className="h-12 w-12 text-yellow-400 mx-auto" />
                <p className="text-xl font-semibold">Winner: <span className="text-accent">{winner}</span></p>
                <p>Congratulations! You gained XP and won the opponent's staked NFT!</p>
                 {/* TODO: Show actual XP gain and NFT transfer visualization */}
                 <div className="flex justify-center gap-4 items-center pt-4">
                     <Image src={winner === player1.username ? player1.nft.imageURL : player2.nft.imageURL} alt="Winner NFT" width={60} height={60} className="rounded-lg border"/>
                     <Zap className="h-6 w-6 text-accent" />
                     <p className="font-bold text-green-500">+50 XP</p>
                      <ShieldCheck className="h-6 w-6 text-blue-500" />
                     <p className="font-bold"> Acquired NFT!</p>
                     <Image src={winner === player1.username ? player2.nft.imageURL : player1.nft.imageURL} alt="Won NFT" width={60} height={60} className="rounded-lg border opacity-70"/>
                 </div>
              </>
            ) : (
              <>
                 <XCircle className="h-12 w-12 text-muted-foreground mx-auto" />
                 <p className="text-xl font-semibold">It's a Draw!</p>
                 <p>No NFTs exchanged. Better luck next time!</p>
              </>
            )}
             <Button onClick={() => window.location.href = '/dashboard'} className="mt-4">Return to Dashboard</Button>
          </CardContent>
        </Card>
      )}

       {/* Battle Log (Optional) */}
       {status === 'ongoing' && battleLog.length > 0 && (
         <Card>
           <CardHeader><CardTitle className="text-lg">Battle Log</CardTitle></CardHeader>
           <CardContent className="h-32 overflow-y-auto text-xs space-y-1 p-2 bg-muted rounded">
             {battleLog.slice().reverse().map((log, index) => <p key={index}>{log}</p>)}
           </CardContent>
         </Card>
       )}

       <style jsx>{`
         @keyframes slide-in-left {
            from { transform: translateX(-50%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
         }
         .animate-slide-in-left { animation: slide-in-left 0.5s ease-out forwards; }

         @keyframes slide-in-right {
            from { transform: translateX(50%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
         }
         .animate-slide-in-right { animation: slide-in-right 0.5s ease-out forwards; }

         @keyframes fade-in {
             from { opacity: 0; transform: translateY(20px); }
             to { opacity: 1; transform: translateY(0); }
         }
         .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }

       `}</style>
    </div>
  );
}
