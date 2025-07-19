"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';

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
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleLogin} className="w-full max-w-md mx-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold font-headline text-primary">Staff Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
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
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full font-bold" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            <p className="mt-4 text-xs text-center text-muted-foreground">
              Use password: <code className="font-mono bg-muted p-1 rounded-sm">password123</code>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}