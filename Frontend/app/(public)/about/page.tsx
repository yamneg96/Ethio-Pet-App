"use client";

import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck, Users, Mail, Phone, MapPin, Globe, Share2 } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="px-8 pt-10">
        <div className="max-w-screen-xl mx-auto text-center space-y-8">
          <Badge className="bg-primary/10 text-primary border-none rounded-full px-6 py-2 font-black text-xs uppercase tracking-[0.2em] mb-4">Our Mission</Badge>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-on-surface">
            Bridging the gap between <br />
            <span className="text-primary italic">hearts</span> and <span className="text-secondary italic">paws.</span>
          </h1>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            PetSanctuary is a world-class editorial platform dedicated to ethical pet adoption and premium breeder curation.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-8 flex items-center justify-center">
         <div className="max-w-screen-2xl w-full grid md:grid-cols-3 gap-12">
            {[
              { title: "Ethical Sourcing", desc: "Every breeder on our platform undergoes a rigorous 20-point verification check to ensure the highest welfare standards.", icon: ShieldCheck, color: "text-secondary" },
              { title: "Lifelong Support", desc: "We don't just facilitate adoptions; we provide a lifetime of veterinary advice and behavioral support for every family.", icon: Heart, color: "text-primary" },
              { title: "Global Community", desc: "Our sanctuary spans continents, connecting over 15,000 families with their perfect companions every year.", icon: Users, color: "text-accent" }
            ].map((v, i) => (
               <div key={i} className="bg-surface-container-low p-12 rounded-[3.5rem] border border-outline-variant space-y-6 group hover:bg-surface-container-high transition-all hover:-translate-y-2">
                  <div className={`w-20 h-20 rounded-3xl bg-background flex items-center justify-center ${v.color} shadow-lg transition-transform group-hover:scale-110`}>
                     <v.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter">{v.title}</h3>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed">{v.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Visual Story */}
      <section className="px-8">
         <div className="max-w-screen-2xl mx-auto rounded-[4rem] overflow-hidden relative aspect-[21/9] shadow-2xl">
            <Image 
               src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=2000" 
               alt="Our Sanctuary"
               fill
               className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
               <div className="text-center text-white space-y-6 max-w-xl">
                  <h2 className="text-6xl font-black tracking-tighter italic">Experience the Sanctuary.</h2>
                  <p className="text-xl font-medium opacity-90">Where every life is valued and every connection is eternal.</p>
                  <Button className="bg-white text-black h-16 px-10 rounded-full font-black text-lg hover:bg-surface-container-low transition-colors">
                     View Gallery
                  </Button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
