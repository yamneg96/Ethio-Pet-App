"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  PawPrint, 
  Tag, 
  MapPin, 
  Info,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { createPetAction } from "@/lib/actions/pet";

export default function NewPetForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      category: formData.get("category"),
      breed: formData.get("breed"),
      age: formData.get("age"),
      price: Number(formData.get("price")),
      location: formData.get("location"),
      description: formData.get("description"),
      images: [formData.get("imageUrl")], // Simple mock for now
      status: "Available"
    };

    const res = await createPetAction(data);

    if (res.success) {
      toast.success("Pet listed successfully!");
      router.push("/seller/manage-pets");
    } else {
      toast.error(res.error || "Failed to create listing");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <Link href="/seller/manage-pets" className="inline-flex items-center gap-2 text-secondary font-bold mb-10 hover:-translate-x-1 transition-transform">
        <ArrowLeft className="h-5 w-5" />
        Back to inventory
      </Link>

      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter mb-4">Add <span className="text-secondary italic">New Friend</span></h1>
        <p className="text-muted-foreground font-medium text-lg">Every detail helps finding the perfect home.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Pet Name</Label>
             <div className="relative">
                <PawPrint className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input name="name" placeholder="e.g. Buddy" required className="h-14 pl-12 rounded-2xl bg-surface-container-low border-none" />
             </div>
          </div>
          <div className="space-y-4">
             <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Category</Label>
             <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <select name="category" className="w-full h-14 pl-12 pr-10 rounded-2xl bg-surface-container-low border-none appearance-none font-bold text-sm outline-none focus:ring-2 ring-secondary/20 transition-all">
                   <option>Dogs</option>
                   <option>Cats</option>
                   <option>Birds</option>
                   <option>Others</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Breed / Species</Label>
              <Input name="breed" placeholder="e.g. Golden Retriever" required className="h-14 px-6 rounded-2xl bg-surface-container-low border-none" />
           </div>
           <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Age</Label>
              <Input name="age" placeholder="e.g. 2 years old" required className="h-14 px-6 rounded-2xl bg-surface-container-low border-none" />
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Price ($)</Label>
              <Input name="price" type="number" placeholder="500" required className="h-14 px-6 rounded-2xl bg-surface-container-low border-none font-black text-lg" />
           </div>
           <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Location</Label>
              <div className="relative">
                 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                 <Input name="location" placeholder="City, Country" required className="h-14 pl-12 rounded-2xl bg-surface-container-low border-none" />
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Image URL</Label>
           <div className="relative">
              <Upload className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input name="imageUrl" placeholder="Paste image address..." required defaultValue="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1200" className="h-14 pl-12 rounded-2xl bg-surface-container-low border-none" />
           </div>
        </div>

        <div className="space-y-4">
           <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
           <Textarea 
             name="description" 
             placeholder="Tell potential owners about personality, health, and history..." 
             required 
             className="min-h-[160px] p-6 rounded-[2rem] bg-surface-container-low border-none focus:ring-2 ring-secondary/20 transition-all font-medium leading-relaxed" 
           />
        </div>

        <Button type="submit" className="w-full h-20 rounded-[2.5rem] text-xl font-black bg-secondary shadow-xl shadow-secondary/20 hover:scale-[1.01] transition-transform group" disabled={loading}>
           {loading ? "Listing..." : "Publish to Marketplace"}
           <Plus className="ml-2 h-6 w-6 group-hover:rotate-90 transition-transform" />
        </Button>
      </form>
    </div>
  );
}
