"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/shared/AuthProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  User, 
  Heart, 
  Share2, 
  ArrowLeft,
  MessageCircle,
  Stethoscope,
  Info,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { createOrderAction } from "@/lib/actions/order";

export default function PetDetailsClient({ pet }: { pet: any }) {
  const [orderLoading, setOrderLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleOrder = async () => {
    if (!user) {
      toast.error("Please login to place an order");
      router.push("/login");
      return;
    }

    setOrderLoading(true);
    const res = await createOrderAction(pet._id, user.address || "Please update your address in profile");

    if (res.success) {
      toast.success("Order placed successfully!");
      router.push("/buyer/orders");
    } else {
      toast.error(res.error || "Failed to place order");
    }
    setOrderLoading(false);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-12">
      <Link href="/pets" className="inline-flex items-center gap-2 text-primary font-bold mb-10 hover:-translate-x-1 transition-transform">
        <ArrowLeft className="h-5 w-5" />
        Back to listings
      </Link>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left - Images */}
        <div className="space-y-6">
          <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-muted shadow-2xl relative">
            <Image
              src={pet.images[0] || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1200"}
              alt={pet.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right - Content */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
               <div>
                 <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                    {pet.category}
                 </Badge>
                 <h1 className="text-6xl font-black tracking-tighter leading-none">{pet.name}</h1>
               </div>
            </div>
            <p className="text-primary text-4xl font-black tracking-tighter">${pet.price.toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
             <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant flex items-center gap-4 text-on-surface">
                <Calendar className="h-6 w-6 text-primary" />
                <div>
                   <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">Age</p>
                   <p className="font-bold">{pet.age}</p>
                </div>
             </div>
             <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant flex items-center gap-4 text-on-surface">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                   <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">Location</p>
                   <p className="font-bold">{pet.location}</p>
                </div>
             </div>
          </div>

          <div className="space-y-6 mb-12">
             <h3 className="text-2xl font-black tracking-tight">About {pet.name}</h3>
             <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                {pet.description}
             </p>
          </div>

          <div className="mt-auto flex gap-4">
             <Button 
               onClick={handleOrder}
               className="flex-1 h-20 rounded-[2rem] text-xl font-black bg-primary group"
               disabled={orderLoading || pet.status !== "Available"}
             >
                {pet.status !== "Available" ? "Adopted" : "Adopt Me Now"}
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
