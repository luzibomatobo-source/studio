
"use client"

import * as React from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const mockOrders = [
    { orderId: "ORD001", customer: "Liam Johnson", email: "liam@example.com", type: "Essentials Box", status: "Delivered", date: "2023-06-23", total: 16.00 },
    { orderId: "ORD002", customer: "Olivia Smith", email: "olivia@example.com", type: "Family Value Box", status: "Out for Delivery", date: "2023-06-24", total: 30.00 },
    { orderId: "ORD003", customer: "Noah Williams", email: "noah@example.com", type: "Essentials Box", status: "Paused", date: "2023-06-25", total: 16.00 },
    { orderId: "ORD004", customer: "Emma Brown", email: "emma@example.com", type: "Family Value Box", status: "Delivered", date: "2023-06-26", total: 30.00 },
    { orderId: "ORD005", customer: "James Jones", email: "james@example.com", type: "Essentials Box", status: "Confirmed", date: "2023-06-27", total: 16.00 },
    { orderId: "ORD006", customer: "Sophia Garcia", email: "sophia@example.com", type: "Family Value Box", status: "Cancelled", date: "2023-06-28", total: 30.00 },
];


export default function OrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
            <TabsTrigger value="delivered" className="hidden sm:flex">
              Delivered
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <Button size="sm" variant="outline" className="h-7 gap-1">
              <ChevronDown className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            <Button size="sm" className="h-7 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Order
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Manage your customer orders here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Type
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell>
                        <div className="font-medium">{order.customer}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {order.email}
                        </div>
                      </TableCell>
                       <TableCell className="hidden md:table-cell">{order.type}</TableCell>
                      <TableCell>
                        <Badge variant={
                            order.status === "Delivered" ? "default" :
                            order.status === "Out for Delivery" ? "secondary" :
                            order.status === "Paused" || order.status === "Cancelled" ? "destructive" : "outline"
                        }>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Pause</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-6</strong> of <strong>6</strong> orders
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" variant="outline" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                 <Button size="sm" variant="outline" disabled>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
