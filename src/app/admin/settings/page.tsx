
"use client"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function SettingsPage() {
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
            </div>
        </div>
    )
}
