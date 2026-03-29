"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/shared/AuthProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreVertical, Edit3, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function SellerManagePetsPage() {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchPets = async () => {
    try {
      const res = await fetch("/api/pets"); // Filtered below for MVP
      const data = await res.json();
      const myPets = data.pets?.filter((p: any) => p.sellerId?._id === user?.id) || [];
      setPets(myPets);
    } catch (error) {
      console.error("Error fetching pets", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchPets();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this listing?")) return;
    try {
      const res = await fetch(`/api/pets/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Listing removed");
        fetchPets();
      } else {
        toast.error("Failed to remove listing");
      }
    } catch (error) {
      toast.error("Error deleting pet");
    }
  };

  const filteredPets = pets.filter((p: any) => p.name.toLowerCase().includes(search.toLowerCase()) || p.breed.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <ManagePetsSkeleton />;

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-2">My <span className="text-primary italic">Listings</span></h1>
          <p className="text-muted-foreground font-medium">Manage and monitor all your pet marketplace entries.</p>
        </div>
        <Link href="/seller/manage-pets/new">
          <Button className="bg-primary text-primary-foreground h-14 px-8 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20">
            <Plus className="h-5 w-5" />
            New Listing
          </Button>
        </Link>
      </div>

      <div className="relative mb-10 md:w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Filter your pets..." 
          className="h-14 pl-12 rounded-2xl border-outline-variant bg-surface-container-low font-bold"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet: any) => (
            <div key={pet._id} className="group bg-surface-container-low rounded-[2rem] border border-outline-variant overflow-hidden hover:shadow-xl transition-all hover:bg-surface-container-high">
              <div className="aspect-[4/3] relative">
                 <img src={pet.images[0]} alt={pet.name} className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-700" />
                 <div className="absolute top-4 right-4 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <Button variant="secondary" size="icon" className="rounded-full h-10 w-10 shadow-lg">
                            <MoreVertical className="h-5 w-5" />
                         </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-2xl mt-2 p-2 shadow-2xl border border-outline-variant">
                         <DropdownMenuItem asChild>
                            <Link href={`/pets/${pet._id}`} className="flex items-center gap-2 font-bold p-3 rounded-xl cursor-pointer">
                               <Eye className="h-4 w-4" /> View Public
                            </Link>
                         </DropdownMenuItem>
                         <DropdownMenuItem asChild>
                            <Link href={`/seller/manage-pets/edit/${pet._id}`} className="flex items-center gap-2 font-bold p-3 rounded-xl cursor-pointer">
                               <Edit3 className="h-4 w-4" /> Edit Details
                            </Link>
                         </DropdownMenuItem>
                         <DropdownMenuItem 
                            onClick={() => handleDelete(pet._id)}
                            className="flex items-center gap-2 font-bold p-3 rounded-xl cursor-pointer text-destructive focus:text-destructive"
                         >
                            <Trash2 className="h-4 w-4" /> Remove
                         </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                 </div>
                 <div className="absolute bottom-4 left-4">
                    <Badge className={`rounded-full px-4 py-1 font-bold text-[10px] uppercase border-none ${
                        pet.status === "Available" ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground"
                    }`}>
                       {pet.status}
                    </Badge>
                 </div>
              </div>
              <div className="p-8 space-y-4">
                 <div className="flex justify-between items-start">
                    <div>
                       <h4 className="text-2xl font-black tracking-tight leading-none mb-2">{pet.name}</h4>
                       <p className="text-muted-foreground font-medium text-xs uppercase tracking-widest">{pet.breed}</p>
                    </div>
                    <p className="text-primary font-black text-xl">${pet.price.toLocaleString()}</p>
                 </div>
                 <div className="flex items-center gap-2 pt-2 border-t border-outline-variant text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span>Listed on {new Date(pet.createdAt).toLocaleDateString()}</span>
                 </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center bg-surface-container-low rounded-[3rem] border-2 border-dashed border-outline-variant">
            <p className="text-muted-foreground font-medium mb-6">No listings found matching your search.</p>
            <Link href="/seller/manage-pets/new">
               <Button className="rounded-full font-bold">Add your first pet</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function ManagePetsSkeleton() {
  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-12 animate-pulse">
      <Skeleton className="h-12 w-64 mb-12" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-[4/3] rounded-[2rem]" />)}
      </div>
    </div>
  );
}
