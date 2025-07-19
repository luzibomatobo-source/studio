"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const mockBlogPosts = [
    { id: 1, title: "Your Voice, Your Veggies", author: "Admin", date: "2024-08-01" },
    { id: 2, title: "Seasonal Spotlight: Winter Greens", author: "Admin", date: "2024-07-15" },
];

export default function AdminDashboardPage() {
    const { toast } = useToast();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log({ title, content, imageUrl });
            toast({
                title: "Blog Post Submitted!",
                description: "Your new blog post has been saved.",
            });
            // Reset form
            setTitle('');
            setContent('');
            setImageUrl('');
            setIsSubmitting(false);
        }, 1500);
    };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline text-primary sm:text-5xl">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">Manage your website content and settings here.</p>
      </header>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        <section className="lg:col-span-2">
            <h2 className="text-2xl font-bold font-headline mb-4">Blog Posts</h2>
            <Card className="shadow-lg">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="p-4 text-left text-sm font-semibold">Title</th>
                                    <th className="p-4 text-left text-sm font-semibold">Author</th>
                                    <th className="p-4 text-left text-sm font-semibold">Date</th>
                                    <th className="p-4 text-right text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockBlogPosts.map(post => (
                                    <tr key={post.id} className="border-b">
                                        <td className="p-4 font-medium">{post.title}</td>
                                        <td className="p-4 text-muted-foreground">{post.author}</td>
                                        <td className="p-4 text-muted-foreground">{post.date}</td>
                                        <td className="p-4 text-right">
                                            <Button variant="ghost" size="sm">Edit</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-headline mb-4">Add New Post</h2>
          <form onSubmit={handleSubmit}>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Create a New Blog Post</CardTitle>
                    <CardDescription>Fill out the details below to publish a new article.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input 
                            id="title" 
                            placeholder="Blog post title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea 
                            id="content" 
                            placeholder="Write your blog post here..." 
                            className="min-h-[150px]"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input 
                            id="imageUrl" 
                            placeholder="https://placehold.co/800x600.png"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
                        {isSubmitting ? 'Publishing...' : 'Publish Post'}
                    </Button>
                </CardFooter>
            </Card>
          </form>
        </section>
      </div>
    </div>
  );
}