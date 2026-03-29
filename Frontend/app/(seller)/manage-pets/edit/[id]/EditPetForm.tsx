"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  PawPrint, 
  Tag, 
  MapPin, 
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { updatePetAction, deletePetAction } from "@/lib/actions/pet";

export default function EditPetForm({ pet }: { pet: any }) {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
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
      images: [formData.get("imageUrl")],
      status: formData.get("status")
    };

    const res = await updatePetAction(pet._id, data);

    if (res.success) {
      toast.success("Pet updated successfully!");
      router.push("/seller/manage-pets");
    } else {
      toast.error(res.error || "Failed to update listing");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    
    setDeleteLoading(true);
    const res = await deletePetAction(pet._id);

    if (res.success) {
      toast.success("Listing deleted");
      router.push("/seller/manage-pets");
    } else {
      toast.error(res.error || "Failed to delete");
    }
    setDeleteLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="flex justify-between items-start mb-10">
        <Link href="/seller/manage-pets" className="inline-flex items-center gap-2 text-secondary font-bold hover:-translate-x-1 transition-transform">
          <ArrowLeft className="h-5 w-5" />
          Back to inventory
        </Link>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={handleDelete}
          disabled={deleteLoading}
          className="rounded-full px-6 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-destructive/20"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Terminate Listing
        </Button>
      </div>

      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter mb-4">Edit <span className="text-secondary italic">Listing</span></h1>
        <p className="text-muted-foreground font-medium text-lg">Modify details for {pet.name}.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Pet Name</Label>
             <div className="relative">
                <PawPrint className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input name="name" defaultValue={pet.name} required className="h-14 pl-12 rounded-2xl bg-surface-container-low border-none" />
             </div>
          </div>
          <div className="space-y-4">
             <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Status</Label>
             <div className="relative">
                <select name="status" defaultValue={pet.status} className="w-full h-14 px-6 rounded-2xl bg-surface-container-low border-none appearance-none font-black text-sm outline-none focus:ring-2 ring-secondary/20 transition-all text-secondary uppercase">
                   <option value="Available">Available</option>
                   <option value="Sold">Sold</option>
                   <option value="Pending">Pending</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Category</Label>
              <select name="category" defaultValue={pet.category} className="w-full h-14 px-6 rounded-2xl bg-surface-container-low border-none font-bold text-sm outline-none">
                 <option>Dogs</option>
                 <option>Cats</option>
                 <option>Birds</option>
                 <option>Others</option>
              </select>
           </div>
           <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Breed</Label>
              <Input name="breed" defaultValue={pet.breed} required className="h-14 px-6 rounded-2xl bg-surface-container-low border-none" />
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Price ($)</Label>
              <Input name="price" type="number" defaultValue={pet.price} required className="h-14 px-6 rounded-2xl bg-surface-container-low border-none font-black text-lg" />
           </div>
           <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Location</Label>
              <Input name="location" defaultValue={pet.location} required className="h-14 px-6 rounded-2xl bg-surface-container-low border-none" />
           </div>
        </div>

        <div className="space-y-4">
           <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Image URL</Label>
           <Input name="imageUrl" defaultValue={pet.images[0]} required className="h-14 px-6 rounded-2xl bg-surface-container-low border-none" />
        </div>

        <div className="space-y-4">
           <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
           <Textarea name="description" defaultValue={pet.description} required className="min-h-[160px] p-6 rounded-[2rem] bg-surface-container-low border-none" />
        </div>

        <Button type="submit" className="w-full h-20 rounded-[2.5rem] text-xl font-black bg-secondary shadow-xl shadow-secondary/20 hover:scale-[1.01] transition-transform group" disabled={loading}>
           {loading ? "Saving..." : "Update Listing"}
           <Save className="ml-2 h-6 w-6 group-hover:scale-110 transition-transform" />
        </Button>
      </form>
    </div>
  );
}
