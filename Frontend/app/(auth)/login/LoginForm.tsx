"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/shared/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { loginAction } from "@/lib/actions/auth";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);

    if (res.success) {
      if (res.user) {
        login(res.user);
        toast.success("Welcome back!");
        router.push(`/${res.user.role === 'buyer' ? 'buy' : 'sell'}-dashboard`);
      }
    } else {
      toast.error(res.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Connection</Label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            id="email"
            name="email"
            placeholder="john@example.com" 
            type="email"
            required
            className="h-14 pl-12 rounded-2xl bg-surface-container-low border-none focus:ring-2 ring-primary/20 transition-all" 
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-end mb-1">
          <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Secure Key</Label>
          <Link href="/forgot-password" px-2 className="text-[10px] font-black uppercase text-primary hover:underline tracking-widest">Resend?</Link>
        </div>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            id="password"
            name="password"
            placeholder="••••••••" 
            type="password"
            required
            className="h-14 pl-12 rounded-2xl bg-surface-container-low border-none focus:ring-2 ring-primary/20 transition-all" 
          />
        </div>
      </div>

      <Button type="submit" className="w-full h-16 rounded-2xl text-lg font-black bg-primary shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all group" disabled={loading}>
        {loading ? "Establishing..." : "Enter Sanctuary"}
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Button>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant"></div></div>
        <div className="relative flex justify-center text-xs uppercase font-black tracking-widest"><span className="bg-surface-container-lowest px-4 text-muted-foreground opacity-40">Or continue with</span></div>
      </div>

      <Button variant="outline" type="button" className="w-full h-14 rounded-2xl border-outline-variant font-bold hover:bg-surface-container-low transition-colors">
        <FaGithub className="mr-2 h-5 w-5" />
        Pass-key (Github)
      </Button>
    </form>
  );
}
