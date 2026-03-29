"use client";

import { Dog, Cat, Bird, Rabbit, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const categories = [
  { name: "Dogs", icon: Dog, count: 124, color: "bg-blue-500" },
  { name: "Cats", icon: Cat, count: 86, color: "bg-amber-500" },
  { name: "Birds", icon: Bird, count: 42, color: "bg-emerald-500" },
  { name: "Others", icon: Rabbit, count: 19, color: "bg-purple-500" },
];

export default function Categories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
      {categories.map((cat, i) => (
        <Link key={i} href={`/pets?category=${cat.name}`}>
          <Card className="border-none shadow-sm bg-surface-container-high rounded-[3rem] group hover:bg-primary transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
            <CardContent className="p-10 flex flex-col items-center text-center">
               <div className={`h-24 w-24 rounded-[2rem] ${cat.color} text-white flex items-center justify-center mb-8 shadow-lg group-hover:bg-white group-hover:text-primary transition-colors duration-500`}>
                  <cat.icon className="h-10 w-10" />
               </div>
               <h3 className="text-3xl font-black tracking-tighter mb-2 group-hover:text-white transition-colors">{cat.name}</h3>
               <p className="text-sm font-black uppercase tracking-widest opacity-40 group-hover:text-white transition-opacity">{cat.count} listings</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
