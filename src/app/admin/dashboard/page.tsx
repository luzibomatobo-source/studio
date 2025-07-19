
"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import { DollarSign, Package, Users } from "lucide-react"

const monthlyRevenue = [
  { month: "Jan", revenue: 450 },
  { month: "Feb", revenue: 520 },
  { month: "Mar", revenue: 680 },
  { month: "Apr", revenue: 730 },
  { month: "May", revenue: 890 },
  { month: "Jun", revenue: 950 },
]

const recentOrders = [
  { id: "SH-123456", customer: "John Doe", status: "Delivered", amount: 16.00 },
  { id: "SH-123457", customer: "Jane Smith", status: "Out for Delivery", amount: 30.00 },
  { id: "SH-123458", customer: "Bob Johnson", status: "Confirmed", amount: 8.00 },
  { id: "SH-123459", customer: "Alice Williams", status: "Delivered", amount: 16.00 },
  { id: "SH-123460", customer: "Charlie Brown", status: "Paused", amount: 15.00 },
]

const deliveryPerformance = [
  { agent: "Agent A", delivered: 45, pending: 5 },
  { agent: "Agent B", delivered: 38, pending: 2 },
  { agent: "Agent C", delivered: 50, pending: 1 },
]

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+235</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deliveries this Week</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You have {recentOrders.length} recent orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.id}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        order.status === "Delivered" ? "default" :
                        order.status === "Out for Delivery" ? "secondary" :
                        order.status === "Paused" ? "destructive" : "outline"
                      }>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${order.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Delivery Agent Performance</CardTitle>
          <CardDescription>
            Performance metrics for active delivery agents this week.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <ResponsiveContainer width="100%" height={350}>
            <BarChart data={deliveryPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="agent" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend />
              <Bar dataKey="delivered" stackId="a" fill="hsl(var(--primary))" name="Delivered"/>
              <Bar dataKey="pending" stackId="a" fill="hsl(var(--muted))" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
