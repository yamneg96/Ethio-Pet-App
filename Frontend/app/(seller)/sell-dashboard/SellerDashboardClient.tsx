"use client";

import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  Plus, 
  ArrowUpRight,
  PawPrint,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function SellerDashboardClient({ initialPets, initialOrders }: { initialPets: any[], initialOrders: any[] }) {
  const stats = [
    { label: "Active Listings", value: initialPets.length, icon: PawPrint, color: "bg-blue-500" },
    { label: "Total Orders", value: initialOrders.length, icon: Package, color: "bg-purple-500" },
    { label: "Revenue", value: `$${initialOrders.filter(o => o.status === "Delivered").reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString()}`, icon: DollarSign, color: "bg-emerald-500" },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">Seller <span className="text-secondary italic">Command</span></h1>
          <p className="text-muted-foreground font-medium">Overview of your marketplace performance and active listings.</p>
        </div>
        <Link href="/seller/manage-pets/new">
          <Button className="rounded-full px-8 py-6 text-lg font-black bg-secondary shadow-xl shadow-secondary/20 hover:scale-[1.02] transition-transform">
            <Plus className="mr-2 h-5 w-5" />
            Add New Pet
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

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Recent Orders */}
        <div className="space-y-8">
           <div className="flex justify-between items-end px-2">
              <h2 className="text-2xl font-black tracking-tighter">Fulfillment Queue</h2>
              <Link href="/seller/orders" className="text-sm font-bold text-secondary hover:underline">Manage All</Link>
           </div>
           <div className="grid gap-4">
              {initialOrders.slice(0, 4).map((order) => (
                 <Card key={order._id} className="border-none shadow-sm bg-surface-container-low overflow-hidden hover:translate-x-1 transition-transform">
                    <CardContent className="p-5 flex items-center gap-6">
                       <div className="h-14 w-14 rounded-2xl bg-muted relative overflow-hidden flex-shrink-0">
                          <Image src={order.petId?.images[0]} alt="" fill className="object-cover" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <h4 className="font-black truncate">{order.petId?.name}</h4>
                          <p className="text-xs font-medium text-muted-foreground truncate italic">Buyer: {order.buyerId?.name}</p>
                       </div>
                       <div className="flex flex-col items-end gap-2">
                          <Badge className="bg-surface-container-high text-on-surface border-none rounded-full px-3 py-0.5 text-[10px] font-black uppercase">
                             {order.status}
                          </Badge>
                          <p className="text-sm font-black tracking-tighter">${order.totalAmount}</p>
                       </div>
                    </CardContent>
                 </Card>
              ))}
              {initialOrders.length === 0 && (
                <div className="bg-surface-container-low p-12 rounded-[2.5rem] border-2 border-dashed border-outline-variant text-center">
                   <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-20" />
                   <p className="font-bold text-muted-foreground italic">No orders yet. They&apos;ll appear here soon!</p>
                </div>
              )}
           </div>
        </div>

        {/* Inventory Highilght */}
        <div className="space-y-8">
           <div className="flex justify-between items-end px-2">
              <h2 className="text-2xl font-black tracking-tighter">My Inventory</h2>
              <Link href="/seller/manage-pets" className="text-sm font-bold text-secondary hover:underline">Manage All</Link>
           </div>
           <div className="grid gap-4">
              {initialPets.slice(0, 4).map((pet) => (
                 <Card key={pet._id} className="border-none shadow-sm bg-surface-container-low overflow-hidden">
                    <CardContent className="p-5 flex items-center gap-6">
                       <div className="h-14 w-14 rounded-2xl bg-muted relative overflow-hidden flex-shrink-0">
                          <Image src={pet.images[0]} alt="" fill className="object-cover" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <h4 className="font-black truncate">{pet.name}</h4>
                          <p className="text-xs font-medium text-muted-foreground truncate">{pet.breed}</p>
                       </div>
                       <div className="flex items-center gap-4">
                          <Badge className={`border-none rounded-full px-3 py-0.5 text-[10px] font-black uppercase ${pet.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                             {pet.status}
                          </Badge>
                          <Link href={`/seller/manage-pets/edit/${pet._id}`}>
                             <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-secondary/10 hover:text-secondary group">
                                <Plus className="h-4 w-4 rotate-45 group-hover:rotate-90 transition-transform" />
                             </Button>
                          </Link>
                       </div>
                    </CardContent>
                 </Card>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
