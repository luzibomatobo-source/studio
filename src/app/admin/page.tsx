
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Package } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a placeholder for real authentication
    // In a real app, you would make an API call here.
    setTimeout(() => {
      if (password === 'password123') {
        toast({
          title: "Login Successful",
          description: "Redirecting to your dashboard...",
        });
        router.push('/admin/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your password and try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
       <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                 <h1 className="text-3xl font-bold">Login</h1>
                 <p className="text-balance text-muted-foreground">
                    Enter your email below to login to your account
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
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                 <p className="mt-4 text-xs text-center text-muted-foreground">
                    Use password: <code className="font-mono bg-muted p-1 rounded-sm">password123</code>
                 </p>
            </form>
        </div>
      </div>
       <div className="hidden bg-muted lg:flex items-center justify-center flex-col p-8 text-center">
            <Package className="h-24 w-24 text-primary" />
            <h2 className="mt-6 text-3xl font-bold">Shepherd Header Admin</h2>
            <p className="text-muted-foreground mt-2">Manage orders, customers, and deliveries with ease.</p>
       </div>
    </div>
  );
}
