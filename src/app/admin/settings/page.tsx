
"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useGalleryStore } from "@/lib/gallery-store"
import Image from "next/image"
import { Trash2, PlusCircle } from "lucide-react"

export default function SettingsPage() {
    const { toast } = useToast();
    const { images, addImage, removeImage } = useGalleryStore();
    const [newImageUrl, setNewImageUrl] = React.useState("");
    const [newImageAlt, setNewImageAlt] = React.useState("");

    const handleAddImage = () => {
        if (!newImageUrl || !newImageAlt) {
            toast({
                title: "Error",
                description: "Please provide both an image URL and a description.",
                variant: "destructive",
            });
            return;
        }

        const newImage = {
            src: newImageUrl,
            alt: newImageAlt,
            aiHint: "", // AI hint is not needed for manually added images
        };

        addImage(newImage);

        toast({
            title: "Success!",
            description: "Image added to the homepage gallery.",
        });

        setNewImageUrl("");
        setNewImageAlt("");
    };

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Business Information</CardTitle>
                        <CardDescription>
                            Update your business name, contact info, and other details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="business-name">Business Name</Label>
                            <Input id="business-name" type="text" className="w-full" defaultValue="Shepherd Header" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="contact-email">Contact Email</Label>
                            <Input id="contact-email" type="email" className="w-full" defaultValue="info@shepherdheader.co.za" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Save</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Delivery Settings</CardTitle>
                        <CardDescription>
                            Configure delivery zones and charges.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                         <div className="grid gap-3">
                            <Label htmlFor="delivery-zone">Primary Delivery Zone</Label>
                            <Input id="delivery-zone" type="text" className="w-full" defaultValue="Bulawayo" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="free-delivery" defaultChecked />
                            <label
                                htmlFor="free-delivery"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Enable free delivery in primary zone
                            </label>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Save</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Super User Actions</CardTitle>
                        <CardDescription>
                            High-level administrative functions. Only available to Super Users.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="new-admin">Promote User to Admin</Label>
                             <div className="flex gap-2">
                                <Input id="new-admin" type="email" placeholder="Enter user email to promote" />
                                <Button variant="secondary">Promote</Button>
                            </div>
                        </div>
                    </CardContent>
                     <CardFooter className="border-t px-6 py-4">
                        <Button variant="destructive">Reset All Data</Button>
                    </CardFooter>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Homepage Gallery</CardTitle>
                        <CardDescription>
                            Add or remove images from the homepage gallery slideshow.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div>
                            <Label>Add New Image</Label>
                            <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                <Input 
                                    type="text" 
                                    placeholder="Image URL" 
                                    value={newImageUrl}
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                />
                                <Input 
                                    type="text" 
                                    placeholder="Image Description (for accessibility)"
                                    value={newImageAlt}
                                    onChange={(e) => setNewImageAlt(e.target.value)}
                                />
                                <Button onClick={handleAddImage} className="w-full sm:w-auto">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add
                                </Button>
                            </div>
                        </div>
                        
                        <div>
                            <Label>Current Gallery Images</Label>
                            <div className="mt-2 space-y-2">
                                {images.map((image, index) => (
                                    <div key={index} className="flex items-center justify-between gap-4 p-2 border rounded-md">
                                        <div className="flex items-center gap-4">
                                            <Image 
                                                src={image.src} 
                                                alt={image.alt} 
                                                width={64} 
                                                height={48} 
                                                className="rounded-md object-cover w-16 h-12" 
                                            />
                                            <p className="text-sm text-muted-foreground truncate">{image.alt}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => removeImage(image.src)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                            <span className="sr-only">Remove</span>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
