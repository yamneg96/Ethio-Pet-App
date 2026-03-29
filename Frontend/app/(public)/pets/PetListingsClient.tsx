"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, PawPrint as Pets, ShieldCheck } from "lucide-react";
import PetCard from "@/components/cards/PetCard";
import { useRouter, useSearchParams } from "next/navigation";

export default function PetListingsClient({ initialPets, searchParams }: { initialPets: any[], searchParams: any }) {
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.search || "");
  const [category, setCategory] = useState(searchParams.category || "All");

  const updateFilters = (newSearch: string, newCategory: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newCategory !== "All") params.set("category", newCategory);
    router.push(`/pets?${params.toString()}`);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-4">Discover <span className="text-primary italic">Friends</span></h1>
          <p className="text-muted-foreground font-medium max-w-md">Find your perfect match from our curated selection of verified pets.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search breeds..." 
              className="pl-10 h-12 rounded-xl border-outline-variant bg-surface-container-low"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && updateFilters(search, category)}
            />
          </div>
          <Button 
            onClick={() => updateFilters(search, category)}
            variant="outline" className="h-12 w-12 rounded-xl border-outline-variant p-0"
          >
             <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <aside className="space-y-10 lg:sticky lg:top-36 h-fit">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">Categories</h3>
            <div className="flex flex-col gap-2">
              {["All", "Dogs", "Cats", "Birds", "Others"].map((item) => (
                <button
                  key={item}
                  onClick={() => { setCategory(item); updateFilters(search, item); }}
                  className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${
                    category === item 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 translate-x-1" 
                    : "hover:bg-surface-container-high text-on-surface-variant hover:translate-x-1"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant">
             <h3 className="text-sm font-black mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-secondary" />
                Verified Promise
             </h3>
             <p className="text-xs text-muted-foreground leading-relaxed">
                Every pet listed on PetSanctuary undergoes a rigorous health check and seller verification process.
             </p>
          </div>
        </aside>

        {/* Listings Grid */}
        <div className="lg:col-span-3">
          {initialPets.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {initialPets.map((pet: any) => (
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
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <h3 className="text-24 font-black tracking-tight mb-2">No friends found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search keywords.</p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-full font-bold"
                onClick={() => {setSearch(""); setCategory("All"); updateFilters("", "All");}}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
