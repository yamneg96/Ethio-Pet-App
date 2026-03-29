"use client";

import { ArrowRight, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-[85vh] rounded-[4rem] overflow-hidden bg-primary text-white shadow-2xl shadow-primary/20 group">
      <Image 
        src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=2000" 
        alt="Pets Hero" 
        fill 
        className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/30 to-transparent flex flex-col justify-end p-16">
        <div className="max-w-4xl space-y-8">
           <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md w-fit px-6 py-2 rounded-full border border-white/20">
              <Sparkle className="h-4 w-4 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest">Connect Hearts & Paws</span>
           </div>
           <h1 className="text-8xl font-black tracking-tighter leading-[0.9] drop-shadow-2xl">
              Where <span className="text-secondary italic">Souls</span> <br /> Find Home.
           </h1>
           <p className="text-2xl font-medium max-w-2xl opacity-90 leading-relaxed italic">
              Experience the future of pet adoption. Verified breeders, secure transactions, and infinite love, all in one ultra-premium sanctuary.
           </p>
           <div className="flex gap-6 items-center">
              <Link href="/pets">
                 <Button className="h-20 rounded-[2.5rem] px-12 text-xl font-black bg-white text-primary hover:bg-white/90 shadow-2xl shadow-white/20 group/btn transition-all">
                    Start Adoption
                    <ArrowRight className="ml-3 h-6 w-6 group-hover/btn:translate-x-2 transition-transform" />
                 </Button>
              </Link>
              <Link href="/register">
                 <Button variant="ghost" className="text-white text-lg font-black hover:bg-white/10 px-8 h-20 rounded-[2.5rem]">
                    Become a Breeder
                 </Button>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
