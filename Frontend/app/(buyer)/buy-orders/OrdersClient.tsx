"use client";

import { 
  ShoppingBag, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Package,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function OrdersClient({ initialOrders, role }: { initialOrders: any[], role: string }) {
  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-4">Adoption <span className="text-primary italic">Journal</span></h1>
          <p className="text-muted-foreground font-medium max-w-md">Chronicle of every heart you&apos;ve connected with.</p>
        </div>
        <div className="bg-surface-container-low p-2 rounded-2xl flex gap-2">
           <Badge className="bg-primary text-white border-none rounded-xl px-4 py-2 font-black uppercase text-[10px] tracking-widest shadow-lg">All Records</Badge>
           <Badge variant="ghost" className="text-muted-foreground border-none rounded-xl px-4 py-2 font-black uppercase text-[10px] tracking-widest hover:bg-surface-container-high transition-colors">Active Only</Badge>
        </div>
      </div>

      <div className="grid gap-10">
        {initialOrders.map((order) => (
          <Card key={order._id} className="border-none shadow-sm bg-surface-container-low overflow-hidden hover:shadow-xl hover:translate-x-1 transition-all duration-300">
             <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row items-stretch">
                   {/* Left - Pet Image */}
                   <div className="w-full lg:w-48 h-48 relative bg-muted flex-shrink-0">
                      <Image 
                        src={order.petId?.images[0]} 
                        alt="" 
                        fill 
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                         <Badge className="bg-white/40 backdrop-blur-md text-slate-900 border-none rounded-full px-4 font-black text-[10px] uppercase">
                            {order.petId?.category}
                         </Badge>
                      </div>
                   </div>

                   {/* Middle - Details */}
                   <div className="flex-1 p-8 flex flex-col justify-center">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2 opacity-60">Order ID: {order._id.slice(-8)}</p>
                            <h3 className="text-3xl font-black tracking-tighter">{order.petId?.name}</h3>
                         </div>
                         <div className="flex flex-col items-end">
                            <p className="text-xs font-bold text-muted-foreground italic mb-2">Transaction Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <Badge className={`rounded-full px-6 py-1.5 font-black uppercase text-[10px] tracking-widest ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-secondary/10 text-secondary'}`}>
                               {order.status}
                            </Badge>
                         </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-8 items-center border-t border-outline-variant pt-6">
                         <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-surface-container-highest flex items-center justify-center">
                               <Package className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                               <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Fulfillment</p>
                               <p className="text-sm font-bold">Courier Delivery</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-surface-container-highest flex items-center justify-center">
                               <ShoppingBag className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                               <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Total Value</p>
                               <p className="text-sm font-black tracking-tighter text-primary">${order.totalAmount}</p>
                            </div>
                         </div>
                         <div className="ml-auto flex items-center gap-4">
                            <Link href={`/${role}/orders/${order._id}`}>
                               <Button className="rounded-full px-8 h-12 font-black transition-all hover:scale-105" variant={role === 'buyer' ? 'default' : 'secondary'}>
                                  View Dossier
                                  <ArrowRight className="ml-2 h-4 w-4" />
                               </Button>
                            </Link>
                         </div>
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>
        ))}

        {initialOrders.length === 0 && (
           <div className="py-32 flex flex-col items-center justify-center bg-surface-container-low rounded-[4rem] border-4 border-dashed border-outline-variant">
              <ShoppingBag className="h-24 w-24 text-muted-foreground opacity-10 mb-8" />
              <h3 className="text-3xl font-black tracking-tight mb-2 opacity-40">The journal is empty</h3>
              <p className="font-medium text-muted-foreground italic">Start your adoption journey to fill these pages.</p>
           </div>
        )}
      </div>
    </div>
  );
}
