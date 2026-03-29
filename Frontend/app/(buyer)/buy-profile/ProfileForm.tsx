"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Save, 
  Camera,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { updateProfileAction } from "@/lib/actions/user";

export default function ProfileForm({ profile, role }: { profile: any, role: string }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      address: formData.get("address"),
      phone: formData.get("phone"),
    };

    const res = await updateProfileAction(data);

    if (res.success) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error(res.error || "Failed to update profile");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter mb-2">Account <span className="text-primary italic">Settings</span></h1>
        <p className="text-muted-foreground font-medium">Manage your personal information and sanctuary preferences.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Side - Avatar */}
        <div className="space-y-8">
          <Card className="border-none shadow-sm bg-surface-container-low rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="h-32 w-32 rounded-[2.5rem] bg-primary/10 mx-auto mb-6 relative group cursor-pointer overflow-hidden border-2 border-primary/20">
                <div className="absolute inset-0 flex items-center justify-center text-primary">
                  <User className="h-12 w-12" />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="text-white h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-black tracking-tight">{profile.name}</h3>
              <p className="text-sm font-medium text-muted-foreground italic mb-6">Member since 2024</p>
              <div className="flex justify-center">
                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${role === 'buyer' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                    Verified {role}
                 </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-surface-container-low rounded-[2rem] overflow-hidden">
             <CardContent className="p-6">
                <h4 className="text-sm font-black mb-4 flex items-center gap-2">
                   <ShieldCheck className="h-4 w-4 text-emerald-500" />
                   Security Status
                </h4>
                <p className="text-xs text-muted-foreground mb-4 font-medium italic">Your account is protected with JWT multi-factor authentication.</p>
                <Button variant="outline" className="w-full rounded-xl text-xs font-bold h-10">Reset Password</Button>
             </CardContent>
          </Card>
        </div>

        {/* Right Side - Form */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm bg-surface-container-low rounded-[2.5rem] overflow-hidden">
            <CardHeader className="px-8 pt-8">
              <CardTitle className="text-2xl font-black tracking-tighter">Personal Identity</CardTitle>
              <CardDescription className="italic font-medium">Information used for adoption contracts and delivery.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input name="name" defaultValue={profile.name} required className="h-14 pl-12 rounded-2xl bg-background border-none" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Connection</Label>
                  <div className="relative opacity-60">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input defaultValue={profile.email} disabled className="h-14 pl-12 rounded-2xl bg-background border-none cursor-not-allowed" />
                  </div>
                  <p className="text-[10px] italic text-muted-foreground ml-1">* Email changes require administrative verification.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Line</Label>
                      <div className="relative">
                         <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                         <Input name="phone" defaultValue={profile.phone} placeholder="+1 (555) 000-0000" className="h-14 pl-12 rounded-2xl bg-background border-none" />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Main Sanctuary (Location)</Label>
                      <div className="relative">
                         <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                         <Input name="address" defaultValue={profile.address} placeholder="Address, City" className="h-14 pl-12 rounded-2xl bg-background border-none" />
                      </div>
                   </div>
                </div>

                <Button type="submit" className={`w-full h-16 rounded-2xl text-lg font-black shadow-xl transition-all group ${role === 'buyer' ? 'bg-primary shadow-primary/20' : 'bg-secondary shadow-secondary/20'}`} disabled={loading}>
                  {loading ? "Persisting..." : "Save Preferences"}
                  <Save className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
