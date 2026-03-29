"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Stethoscope,
  Info,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { updateOrderStatusAction } from "@/lib/actions/order";

export default function OrderDetailsClient({ order, role }: { order: any, role: string }) {
  const [updating, setUpdating] = useState(false);
  const isSeller = role === "seller" || role === "admin";

  const handleStatusUpdate = async (newStatus: string) => {
    setUpdating(true);
    const res = await updateOrderStatusAction(order._id, newStatus);
    if (res.success) {
      toast.success(`Order marked as ${newStatus}`);
      window.location.reload(); // Simple refresh for now
    } else {
      toast.error(res.error || "Update failed");
    }
    setUpdating(false);
  };

  const steps = [
    { label: "Ordered", date: order.createdAt, done: true },
    { label: "Processing", date: order.createdAt, done: order.status !== "Pending" },
    { label: "Shipped", date: null, done: ["Shipped", "Delivered"].includes(order.status) },
    { label: "Delivered", date: null, done: order.status === "Delivered" },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-8 py-12">
      <Link href={`/${role}/orders`} className="inline-flex items-center gap-2 text-primary font-bold mb-10 hover:-translate-x-1 transition-transform">
        <ArrowLeft className="h-5 w-5" />
        Back to history
      </Link>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Status Header */}
          <div className="bg-surface-container-low p-10 rounded-[3rem] border border-outline-variant relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8">
                <Badge className={`rounded-full px-6 py-2 font-black uppercase text-xs tracking-widest ${order.status === 'Delivered' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}>
                   {order.status}
                </Badge>
             </div>
             <div className="space-y-2 mb-10">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Order Dossier</p>
                <h1 className="text-5xl font-black tracking-tighter">#{order._id.slice(-8).toUpperCase()}</h1>
             </div>

             {/* Tracking Progress */}
             <div className="flex justify-between relative">
                <div className="absolute top-5 left-0 w-full h-1 bg-outline-variant -z-0" />
                <div className="absolute top-5 left-0 h-1 bg-primary transition-all duration-1000 -z-0" style={{ width: `${(steps.filter(s => s.done).length - 1) * 33}%` }} />
                {steps.map((step, i) => (
                   <div key={i} className="relative z-10 flex flex-col items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center border-4 border-surface-container-low transition-colors duration-500 ${step.done ? 'bg-primary text-white' : 'bg-outline-variant text-muted-foreground'}`}>
                         {step.done ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                      </div>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${step.done ? 'text-on-surface' : 'text-muted-foreground opacity-40'}`}>{step.label}</p>
                   </div>
                ))}
             </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
             <h2 className="text-3xl font-black tracking-tighter ml-2 italic">Pet Details</h2>
             <Card className="border-none shadow-sm bg-surface-container-low rounded-[2.5rem] overflow-hidden">
                <CardContent className="p-8 flex items-center gap-10">
                   <div className="h-40 w-40 rounded-3xl bg-muted relative overflow-hidden flex-shrink-0 shadow-lg">
                      <Image src={order.petId?.images[0]} alt="" fill className="object-cover" />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                         <div>
                            <Badge className="bg-primary/10 text-primary border-none rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest mb-2">
                               {order.petId?.category}
                            </Badge>
                            <h3 className="text-4xl font-black tracking-tighter">{order.petId?.name}</h3>
                            <p className="text-lg font-medium text-muted-foreground italic">{order.petId?.breed}</p>
                         </div>
                         <p className="text-3xl font-black tracking-tighter text-primary">${order.totalAmount}</p>
                      </div>
                   </div>
                </CardContent>
             </Card>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
           {isSeller && order.status !== "Delivered" && (
              <Card className="border-none shadow-xl bg-surface-container-highest rounded-[2.5rem] p-4">
                 <CardContent className="p-4 space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-center mb-4">Fulfillment Control</h3>
                    {order.status === "Pending" && (
                       <Button 
                         onClick={() => handleStatusUpdate("Shipped")} 
                         className="w-full h-14 rounded-2xl bg-primary font-black"
                         disabled={updating}
                       >
                          Dispatch Courier
                       </Button>
                    )}
                    {order.status === "Shipped" && (
                       <Button 
                         onClick={() => handleStatusUpdate("Delivered")} 
                         className="w-full h-14 rounded-2xl bg-emerald-600 font-black text-white"
                         disabled={updating}
                       >
                          Confirm Delivery
                       </Button>
                    )}
                 </CardContent>
              </Card>
           )}

           <Card className="border-none shadow-sm bg-surface-container-low rounded-[2.5rem]">
              <CardContent className="p-8 space-y-8">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Logistics Destination</p>
                    <div className="flex items-start gap-3 mt-2">
                       <MapPin className="h-5 w-5 text-primary mt-0.5" />
                       <p className="font-bold leading-relaxed">{order.shippingAddress || "N/A"}</p>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">{role === 'buyer' ? 'Seller Contact' : 'Buyer Contact'}</p>
                    <div className="flex items-center gap-3 mt-2">
                       <div className="h-10 w-10 rounded-xl bg-surface-container-highest flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                       </div>
                       <div>
                          <p className="text-sm font-black">{role === 'buyer' ? order.sellerId?.name : order.buyerId?.name}</p>
                          <p className="text-xs font-medium text-muted-foreground italic">{role === 'buyer' ? order.sellerId?.email : order.buyerId?.email}</p>
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
