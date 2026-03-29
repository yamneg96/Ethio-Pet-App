"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  CheckCircle2,
  Award,
  Users
} from "lucide-react";
import PetCard from "@/components/cards/PetCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function SellerProfilePublicPage({ params }: { params: { id: string } }) {
  const [seller, setSeller] = useState<any>(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        // Mocking for now as we don't have a specific GET /api/users/:id
        setSeller({
          id: params.id,
          name: "Blue Ribbon Breeders",
          email: "contact@blueribbon.com",
          phone: "+1 (555) 123-4567",
          location: "Lexington, KY",
          image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200",
          bio: "Passionate about ethical breeding and finding the perfect homes for our furry friends. Verified breeder since 2018.",
          stats: { pets: 12, sold: 85, rating: 4.9 }
        });

        const res = await fetch("/api/pets");
        const data = await res.json();
        setPets(data.pets?.slice(0, 4) || []);
      } catch (error) {
         console.error("Error fetching seller profile", error);
      } finally {
         setLoading(false);
      }
    };
    fetchSellerData();
  }, [params.id]);

  if (loading) return <SellerProfileSkeleton />;

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-12">
      {/* Header / Hero */}
      <div className="bg-surface-container-low rounded-[3rem] p-12 mb-16 border border-outline-variant flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
           <div className="h-48 w-48 rounded-[3rem] bg-white shadow-2xl overflow-hidden border-4 border-white flex-shrink-0">
              <img src={seller.image} alt={seller.name} className="h-full w-full object-cover" />
           </div>
           <div className="flex-1 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                 <h1 className="text-5xl font-black tracking-tighter italic">{seller.name}</h1>
                 <Badge className="bg-secondary text-secondary-foreground border-none rounded-full px-4 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 h-fit py-1.5 mx-auto md:mx-0">
                    <ShieldCheck className="h-3 w-3" /> Verified Breeder
                 </Badge>
              </div>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                 {seller.bio}
              </p>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                 <div className="flex items-center gap-2 text-on-surface font-bold">
                    <MapPin className="h-5 w-5 text-primary" /> {seller.location}
                 </div>
                 <div className="flex items-center gap-2 text-on-surface font-bold">
                    <Calendar className="h-5 w-5 text-primary" /> Joined {new Date().getFullYear() - 5}
                 </div>
              </div>
           </div>
           <Button className="h-16 px-10 rounded-2xl font-black text-lg bg-primary gap-3 shadow-xl shadow-primary/20">
              <MessageCircle className="h-6 w-6" /> Contact Seller
           </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
         {/* Sidebar Stats */}
         <aside className="space-y-8">
            <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant space-y-8">
               <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">Success Rate</p>
                  <div className="flex items-end gap-2">
                     <span className="text-5xl font-black tracking-tighter">{seller.stats.sold}+</span>
                     <span className="text-secondary font-black text-sm mb-2">Pets Rehomed</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">Avg. Rating</p>
                  <div className="flex items-center gap-2 text-accent text-3xl font-black italic">
                     <Star className="h-8 w-8 fill-current" /> {seller.stats.rating}
                  </div>
               </div>
               <div className="pt-8 border-t border-outline-variant grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-3xl bg-background">
                     <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
                     <p className="text-[10px] font-black uppercase">Expert</p>
                  </div>
                  <div className="text-center p-4 rounded-3xl bg-background">
                     <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                     <p className="text-[10px] font-black uppercase">Trusted</p>
                  </div>
               </div>
            </div>
         </aside>

         {/* Pets List */}
         <div className="lg:col-span-3 space-y-12">
            <div className="flex justify-between items-center">
               <h2 className="text-4xl font-black tracking-tight">Active <span className="text-primary italic">Listings</span></h2>
               <p className="text-muted-foreground font-bold">{pets.length} Available Items</p>
            </div>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
               {pets.map((pet: any) => (
                  <PetCard 
                    key={pet._id} 
                    id={pet._id}
                    name={pet.name}
                    breed={pet.breed}
                    age={pet.age}
                    price={pet.price}
                    location={pet.location}
                    image={pet.images[0]}
                    category={pet.category}
                  />
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

function SellerProfileSkeleton() {
  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-12 animate-pulse">
       <Skeleton className="h-96 w-full rounded-[3rem] mb-16" />
       <div className="grid lg:grid-cols-4 gap-12">
          <Skeleton className="h-[400px] rounded-[2.5rem]" />
          <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
             {[1, 2, 3].map(i => <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />)}
          </div>
       </div>
    </div>
  );
}
