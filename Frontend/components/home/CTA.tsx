"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <div className="bg-secondary rounded-[4rem] p-20 text-white relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 scale-150 group-hover:rotate-45 transition-transform duration-1000">
         <ShieldCheck className="h-96 w-96" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-10">
         <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] opacity-60">Verified Trust</h2>
            <p className="text-7xl font-black tracking-tighter leading-none">Ready to start <br /> <span className="italic underline decoration-white/20">your legacy?</span></p>
         </div>
         
         <p className="text-2xl font-medium max-w-2xl opacity-80 leading-relaxed italic">
            Whether you&apos;re looking to add a family member or share your pets with the world, our sanctuary provides the safest environment for your journey.
         </p>

         <div className="flex gap-6">
            <Link href="/register">
               <Button className="h-20 rounded-[2.5rem] px-12 text-xl font-black bg-white text-secondary hover:bg-white/90 shadow-2xl transition-all">
                  Join Sanctuary
                  <ArrowRight className="ml-3 h-6 w-6" />
               </Button>
            </Link>
         </div>
      </div>
    </div>
  );
}
