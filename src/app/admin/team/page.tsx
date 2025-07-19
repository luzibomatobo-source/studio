
"use client"
import {
  MoreHorizontal,
  PlusCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const mockTeamMembers = [
    { id: 1, name: "Agent A", email: "agenta@shepherdheader.co.za", role: "Delivery Agent", status: "Active", deliveries: 45, cashOnHand: 75.50 },
    { id: 2, name: "Agent B", email: "agentb@shepherdheader.co.za", role: "Delivery Agent", status: "Active", deliveries: 38, cashOnHand: 50.00 },
    { id: 3, name: "Agent C", email: "agentc@shepherdheader.co.za", role: "Team Leader", status: "Active", deliveries: 50, cashOnHand: 120.00 },
    { id: 4, name: "Agent D", email: "agentd@shepherdheader.co.za", role: "Delivery Agent", status: "Inactive", deliveries: 0, cashOnHand: 0.00 },
]

export default function TeamManagementPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
                    <p className="text-muted-foreground">
                        Manage your delivery agents and team leaders.
                    </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" className="h-8 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Member
                                </span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Team Member</DialogTitle>
                                <DialogDescription>
                                    Fill in the details to add a new member to your team.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">Name</Label>
                                    <Input id="name" placeholder="John Doe" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">Email</Label>
                                    <Input id="email" type="email" placeholder="agent@example.com" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="role" className="text-right">Role</Label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="agent">Delivery Agent</SelectItem>
                                            <SelectItem value="leader">Team Leader</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Add Member</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                        A list of all team members in your organization.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">Deliveries (Week)</TableHead>
                                <TableHead className="text-right">Cash on Hand</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockTeamMembers.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>
                                        <div className="font-medium">{member.name}</div>
                                        <div className="text-sm text-muted-foreground">{member.email}</div>
                                    </TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell>
                                        <Badge variant={member.status === 'Active' ? 'default' : 'destructive'}>
                                            {member.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{member.deliveries}</TableCell>
                                    <TableCell className="text-right">${member.cashOnHand.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                                <DropdownMenuItem>View Performance</DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    {member.status === 'Active' ? 'Set as Inactive' : 'Set as Active'}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel>Promote To</DropdownMenuLabel>
                                                <DropdownMenuItem>Team Leader</DropdownMenuItem>
                                                <DropdownMenuItem>Admin</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
