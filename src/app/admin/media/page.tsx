
"use client";

import * as React from 'react';
import { useGalleryStore } from '@/lib/gallery-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Trash2, PlusCircle, Save } from 'lucide-react';
import Image from 'next/image';

interface GalleryImage {
    src: string;
    alt: string;
    aiHint: string;
}

function EditImageCard({ image }: { image: GalleryImage }) {
    const { updateImage, removeImage } = useGalleryStore();
    const { toast } = useToast();
    const [currentImage, setCurrentImage] = React.useState(image);
    const [newSrc, setNewSrc] = React.useState(image.src);
    const [newAlt, setNewAlt] = React.useState(image.alt);
    const [newAiHint, setNewAiHint] = React.useState(image.aiHint);
    
    const handleUpdate = () => {
        const updatedImage = { src: newSrc, alt: newAlt, aiHint: newAiHint };
        updateImage(currentImage.src, updatedImage);
        setCurrentImage(updatedImage);
        toast({ title: 'Image Updated', description: 'The image details have been saved.' });
    };

    const handleRemove = () => {
        removeImage(currentImage.src);
        toast({ title: 'Image Removed', description: 'The image has been removed from the gallery.', variant: 'destructive' });
    };

    return (
        <Card>
            <CardContent className="p-4">
                <div className="relative aspect-video w-full mb-4">
                    <Image src={newSrc} alt={newAlt} fill className="rounded-md object-cover" />
                </div>
                <div className="space-y-3">
                    <div>
                        <Label htmlFor={`src-${image.src}`}>Image URL</Label>
                        <Input id={`src-${image.src}`} value={newSrc} onChange={(e) => setNewSrc(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor={`alt-${image.src}`}>Alt Text</Label>
                        <Input id={`alt-${image.src}`} value={newAlt} onChange={(e) => setNewAlt(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor={`aiHint-${image.src}`}>AI Hint</Label>
                        <Input id={`aiHint-${image.src}`} value={newAiHint} onChange={(e) => setNewAiHint(e.target.value)} />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
                <Button variant="destructive" size="sm" onClick={handleRemove}><Trash2 className="mr-2 h-4 w-4" />Remove</Button>
                <Button size="sm" onClick={handleUpdate}><Save className="mr-2 h-4 w-4" />Save</Button>
            </CardFooter>
        </Card>
    );
}

export default function MediaPage() {
    const { images, addImage } = useGalleryStore();
    const { toast } = useToast();
    const [newImage, setNewImage] = React.useState({ src: '', alt: '', aiHint: '' });

    const handleAddImage = () => {
        if (!newImage.src || !newImage.alt || !newImage.aiHint) {
            toast({ title: 'Error', description: 'Please fill all fields for the new image.', variant: 'destructive' });
            return;
        }
        addImage(newImage);
        setNewImage({ src: '', alt: '', aiHint: '' });
        toast({ title: 'Image Added', description: 'The new image has been added to the gallery.' });
    };

    // This is needed to ensure the component re-renders with the correct state from localStorage
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Media Management</h2>
                    <p className="text-muted-foreground">Update homepage gallery images.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add New Image</CardTitle>
                    <CardDescription>Add a new image by providing its URL and descriptive text.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="new-src">Image URL</Label>
                        <Input id="new-src" placeholder="https://..." value={newImage.src} onChange={(e) => setNewImage({ ...newImage, src: e.target.value })} />
                    </div>
                    <div>
                        <Label htmlFor="new-alt">Alt Text</Label>
                        <Input id="new-alt" placeholder="A descriptive text for the image" value={newImage.alt} onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })} />
                    </div>
                    <div>
                        <Label htmlFor="new-ai-hint">AI Hint</Label>
                        <Input id="new-ai-hint" placeholder="e.g. fresh vegetables" value={newImage.aiHint} onChange={(e) => setNewImage({ ...newImage, aiHint: e.target.value })} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleAddImage}><PlusCircle className="mr-2 h-4 w-4" />Add to Gallery</Button>
                </CardFooter>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {images.map((image) => (
                    <EditImageCard key={image.src} image={image} />
                ))}
            </div>
        </div>
    );
}
