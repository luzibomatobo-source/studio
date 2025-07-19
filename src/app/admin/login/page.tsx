
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Package } from 'lucide-react';
import Image from 'next/image';

const SUPER_USER_EMAIL = 'admin@shepherdheader.co.za';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const isSuperUser = email.toLowerCase() === SUPER_USER_EMAIL;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a placeholder for real authentication
    setTimeout(() => {
      let loggedIn = false;
      if (isSuperUser) {
        if (password === 'password123') {
            loggedIn = true;
        }
      } else {
        // For non-super users, just check if a phone number was entered.
        if (phone.length > 0) {
            loggedIn = true;
        }
      }

      if (loggedIn) {
        toast({
          title: "Login Successful",
          description: "Redirecting to your dashboard...",
        });
        router.push('/admin');
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your details and try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
       <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                 <h1 className="text-3xl font-bold">Login</h1>
                 <p className="text-balance text-muted-foreground">
                    Enter your credentials to access the admin portal.
                </p>
            </div>
            <form onSubmit={handleLogin} className="grid gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="info@shepherdheader.co.za"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                 </div>
                {isSuperUser ? (
                     <div className="grid gap-2">
                         <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <a href="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </a>
                         </div>
                         <Input 
                            id="password" 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                         <p className="text-xs text-muted-foreground">
                            Use password: <code className="font-mono bg-muted p-1 rounded-sm">password123</code>
                         </p>
                    </div>
                ) : (
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                 <p className="mt-4 text-xs text-center text-muted-foreground">
                    Super user email: <code className="font-mono bg-muted p-1 rounded-sm">{SUPER_USER_EMAIL}</code>
                 </p>
            </form>
        </div>
      </div>
       <div className="hidden bg-muted lg:block relative">
            <Image
                src="https://placehold.co/1080x1920.png"
                data-ai-hint="veggie box"
                alt="A beautiful box of fresh vegetables."
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
                <h2 className="mt-6 text-4xl font-bold">Shepherd Header Admin</h2>
                <p className="text-lg mt-2">Manage orders, customers, and deliveries with ease.</p>
            </div>
       </div>
    </div>
  );
}
