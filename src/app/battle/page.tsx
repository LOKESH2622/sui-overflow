import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Swords, PlusCircle, Users } from "lucide-react";
import Link from "next/link";

export default function BattlePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome to the Arena!</h1>
      <p className="text-muted-foreground text-center mb-12">Choose your path to meme glory.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* Create Match Card */}
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <PlusCircle className="mx-auto h-12 w-12 text-accent mb-4" />
            <CardTitle>Create a New Match</CardTitle>
            <CardDescription>Set the rules, stake your NFT, and challenge the world.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-accent hover:bg-accent/90">
              <Link href="/battle/create">Create Match</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Join Match Card */}
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
             <Swords className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle>Join an Existing Match</CardTitle>
            <CardDescription>Browse open challenges and find your next opponent.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/battle/join">Find Opponent</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Tournaments Card */}
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <Users className="mx-auto h-12 w-12 text-secondary-foreground mb-4" />
            <CardTitle>Enter Tournaments</CardTitle>
            <CardDescription>Compete in scheduled events for bigger prizes and glory.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/tournaments">View Tournaments</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
