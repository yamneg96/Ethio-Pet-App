"use client";

import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Heart,
  Calendar,
  Settings,
  User,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function BuyerDashboardClient({ profile, initialOrders }: { profile: any, initialOrders: any[] }) {
  const stats = [
    { label: "My Adoptions", value: initialOrders.length, icon: ShoppingBag, color: "bg-blue-500" },
    { label: "Pending", value: initialOrders.filter(o => o.status === "Pending").length, icon: Clock, color: "bg-amber-500" },
    { label: "Completed", value: initialOrders.filter(o => o.status === "Delivered").length, icon: CheckCircle2, color: "bg-emerald-500" },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">My <span className="text-primary italic">Sanctuary</span></h1>
          <p className="text-muted-foreground font-medium">Welcome back, {profile.name}. Track your family additions here.</p>
        </div>
        <Link href="/pets">
          <Button className="rounded-full px-8 py-6 text-lg font-black bg-primary shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
            Browse More Friends
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-surface-container-low overflow-hidden group">
            <CardContent className="p-8 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">{stat.label}</p>
                <h3 className="text-4xl font-black tracking-tighter">{stat.value}</h3>
              </div>
              <div className={`h-14 w-14 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-7 w-7" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-black tracking-tighter">Recent Adoptions</h2>
            <Link href="/buyer/orders" className="text-sm font-bold text-primary hover:underline">View All Orders</Link>
          </div>
          
          <div className="grid gap-6">
            {initialOrders.slice(0, 3).map((order) => (
              <Card key={order._id} className="border-none shadow-sm bg-surface-container-low overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center gap-6">
                  <div className="h-20 w-20 rounded-2xl bg-muted relative overflow-hidden flex-shrink-0">
                    <Image 
                      src={order.petId?.images[0] || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200"} 
                      alt={order.petId?.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-black tracking-tight mb-1 truncate">{order.petId?.name}</h4>
                    <p className="text-sm font-medium text-muted-foreground mb-2 italic">Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
                    <Badge variant={order.status === "Pending" ? "secondary" : "default"} className="rounded-full text-[10px] font-black uppercase">
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black tracking-tighter mb-2">${order.totalAmount}</p>
                    <Link href={`/buyer/orders/${order._id}`}>
                      <Button variant="outline" size="sm" className="rounded-full font-bold">Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
            {initialOrders.length === 0 && (
              <div className="bg-surface-container-low p-12 rounded-[2.5rem] border-2 border-dashed border-outline-variant text-center">
                 <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-20" />
                 <p className="font-bold text-muted-foreground">No orders yet. Start browsing!</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-black tracking-tighter">Profile Snapshot</h2>
          <Card className="border-none shadow-sm bg-surface-container-high rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-0 text-center">
              <div className="h-24 w-24 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                 <User className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl font-black tracking-tighter">{profile.name}</CardTitle>
              <p className="text-sm font-medium text-muted-foreground italic mb-4">{profile.email}</p>
              <Badge className="bg-primary/20 text-primary border-none rounded-full px-4 py-1 font-black uppercase text-[10px]">{profile.role}</Badge>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
               <div className="flex items-center gap-4 text-sm font-bold opacity-70">
                  <MapPin className="h-4 w-4" />
                  {profile.address || "No address set"}
               </div>
               <Link href="/buyer/profile">
                 <Button className="w-full mt-4 rounded-2xl h-14 font-black" variant="secondary">
                   <Settings className="mr-2 h-4 w-4" />
                   Manage Account
                 </Button>
               </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
