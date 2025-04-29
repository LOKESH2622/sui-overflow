"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ImagePlus, Loader2, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProfileCreation() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [avatarOption, setAvatarOption] = useState<string>("default");
  const [memeTemplate, setMemeTemplate] = useState<string>("template1");
  const [captionTop, setCaptionTop] = useState("");
  const [captionBottom, setCaptionBottom] = useState("");
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [minting, setMinting] = useState(false);
  const [mintingProgress, setMintingProgress] = useState(0);
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null); // For preview

  const checkUsernameAvailability = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsUsernameAvailable(username.length > 3 && !["admin", "root"].includes(username));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setCustomImage(file);
      setCustomImageUrl(URL.createObjectURL(file)); // Create object URL for preview
    }
  };

   // Clean up object URL when component unmounts or image changes
   React.useEffect(() => {
     return () => {
       if (customImageUrl) {
         URL.revokeObjectURL(customImageUrl);
       }
     };
   }, [customImageUrl]);


  const handleMint = async () => {
    setMinting(true);
    setMintingProgress(0);
    // Simulate minting process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setMintingProgress(i);
    }
    await new Promise(resolve => setTimeout(resolve, 500)); // Final delay
    setMinting(false);
    // Redirect or show success message
    console.log("NFT Minted!");
    alert("Profile created and first Meme NFT minted successfully!");
    // TODO: Redirect to dashboard: router.push('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Username & Avatar
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create Your Profile</CardTitle>
              <CardDescription>Choose a unique username and your avatar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setIsUsernameAvailable(null); }}
                    className={isUsernameAvailable === false ? "border-destructive" : isUsernameAvailable === true ? "border-green-500" : ""}
                  />
                  <Button onClick={checkUsernameAvailability} disabled={!username || username.length <= 3}>Check</Button>
                </div>
                 {isUsernameAvailable === false && <p className="text-sm text-destructive">Username not available.</p>}
                 {isUsernameAvailable === true && <p className="text-sm text-green-500 flex items-center"><CheckCircle className="h-4 w-4 mr-1"/> Username available!</p>}
              </div>
              <div className="space-y-2">
                <Label>Avatar Selection</Label>
                 <Select onValueChange={setAvatarOption} defaultValue={avatarOption}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Avatar Option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Avatars</SelectItem>
                      <SelectItem value="nft">Import from NFT</SelectItem>
                    </SelectContent>
                  </Select>
                <div className="flex justify-center pt-2">
                  {/* Placeholder for avatar selection UI */}
                   <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarOption === 'nft' ? 'https://picsum.photos/100' : ''} alt="Selected Avatar" />
                    <AvatarFallback className="text-4xl"><User/></AvatarFallback>
                  </Avatar>
                </div>
                 {avatarOption === 'nft' && <p className="text-sm text-muted-foreground text-center">Connect wallet to select NFT.</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep(2)} disabled={!isUsernameAvailable}>Next</Button>
            </CardFooter>
          </Card>
        );
      case 2: // Create First Meme NFT
        return (
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Create Your First Meme NFT</CardTitle>
              <CardDescription>Let's make your debut meme!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Meme Creation Form */}
                <div className="space-y-4">
                   <div className="space-y-2">
                     <Label>Meme Template</Label>
                     <Select onValueChange={setMemeTemplate} defaultValue={memeTemplate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="template1">Classic Top/Bottom</SelectItem>
                          <SelectItem value="template2">Distracted Boyfriend</SelectItem>
                          <SelectItem value="template3">Drake Meme</SelectItem>
                          <SelectItem value="custom">Upload Your Own</SelectItem>
                        </SelectContent>
                      </Select>
                  </div>
                   {memeTemplate === 'custom' && (
                     <div className="space-y-2">
                      <Label htmlFor="custom-image">Upload Image</Label>
                      <Input id="custom-image" type="file" accept="image/*" onChange={handleImageUpload} />
                      {customImage && <p className="text-sm text-muted-foreground">{customImage.name}</p>}
                    </div>
                   )}
                  <div className="space-y-2">
                    <Label htmlFor="caption-top">Top Text</Label>
                    <Textarea id="caption-top" placeholder="Enter top caption" value={captionTop} onChange={(e) => setCaptionTop(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caption-bottom">Bottom Text</Label>
                    <Textarea id="caption-bottom" placeholder="Enter bottom caption" value={captionBottom} onChange={(e) => setCaptionBottom(e.target.value)} />
                  </div>
                </div>

                {/* Meme Preview */}
                <div className="border rounded-lg p-4 flex flex-col items-center justify-center bg-muted min-h-[300px]">
                   <h4 className="mb-2 font-semibold">Meme Preview</h4>
                   <div className="relative w-full max-w-[250px] aspect-square bg-secondary rounded flex items-center justify-center overflow-hidden">
                      {/* Display selected template image or uploaded image */}
                      {memeTemplate !== 'custom' || !customImageUrl ? (
                         <ImagePlus className="h-16 w-16 text-muted-foreground" />
                      ) : (
                        <img src={customImageUrl} alt="Custom Meme Preview" className="object-contain h-full w-full" />
                      )}
                      {/* Overlay captions */}
                      <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none">
                         <p className="text-center text-white font-bold text-lg break-words meme-text">{captionTop}</p>
                         <p className="text-center text-white font-bold text-lg break-words meme-text">{captionBottom}</p>
                      </div>
                   </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
               <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={(!captionTop && !captionBottom) || (memeTemplate === 'custom' && !customImage)}>Review & Mint</Button>
            </CardFooter>
             <style jsx>{`
                .meme-text {
                  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
                  font-family: 'Impact', Haettenschweiler, 'Arial Narrow Bold', sans-serif; /* Classic meme font */
                  text-transform: uppercase;
                }
            `}</style>
          </Card>
        );
      case 3: // Minting Process
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Mint Your NFT</CardTitle>
              <CardDescription>Finalizing your profile and minting your first meme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p>Username: <strong>{username}</strong></p>
              <p>Meme Ready to Mint!</p>
              {/* Simple preview could go here */}
              <div className="border rounded-lg p-4 flex flex-col items-center justify-center bg-muted min-h-[200px] max-w-[200px] mx-auto">
                 <div className="relative w-full aspect-square bg-secondary rounded flex items-center justify-center overflow-hidden">
                    {memeTemplate === 'custom' && customImageUrl ? (
                      <img src={customImageUrl} alt="Final Meme Preview" className="object-contain h-full w-full" />
                    ) : (
                       <ImagePlus className="h-12 w-12 text-muted-foreground" />
                    )}
                    <div className="absolute inset-0 flex flex-col justify-between p-1 pointer-events-none">
                       <p className="text-center text-white font-semibold text-xs break-words meme-text-small">{captionTop}</p>
                       <p className="text-center text-white font-semibold text-xs break-words meme-text-small">{captionBottom}</p>
                    </div>
                 </div>
              </div>

              {minting && (
                <div className="space-y-2 pt-4">
                   <p>Minting in progress...</p>
                   <Progress value={mintingProgress} className="w-full" />
                   <p className="text-sm text-muted-foreground">{mintingProgress}% Complete</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)} disabled={minting}>Back</Button>
              <Button onClick={handleMint} disabled={minting}>
                {minting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Minting...</> : "Confirm & Mint NFT"}
              </Button>
            </CardFooter>
             <style jsx>{`
                .meme-text-small {
                  text-shadow: 1px 1px 2px rgba(0,0,0,0.9);
                   font-family: 'Impact', Haettenschweiler, 'Arial Narrow Bold', sans-serif; /* Classic meme font */
                   text-transform: uppercase;
                }
            `}</style>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4">
      {renderStep()}
    </div>
  );
}
