import { registerAction } from "@/lib/actions/auth";
import RegisterForm from "./RegisterForm";
import { PawPrint as Pets, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center p-8 font-sans">
      <div className="max-w-screen-xl w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Visual */}
        <div className="hidden lg:flex flex-col space-y-12">
           <div className="space-y-6">
              <div className="h-16 w-16 bg-primary text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20">
                 <Pets className="h-8 w-8" />
              </div>
              <h1 className="text-7xl font-black tracking-tighter leading-none">
                 Start Your <br /> <span className="text-primary italic underline decoration-primary/10">Legacy.</span>
              </h1>
              <p className="text-2xl text-muted-foreground font-medium max-w-md leading-relaxed">
                 Join the most prestigious sanctuary for pet lovers and breeders. Verified, secure, and full of love.
              </p>
           </div>
           
           <div className="bg-secondary/10 p-8 rounded-[2.5rem] border border-secondary/20 max-w-sm space-y-4">
              <ShieldCheck className="h-10 w-10 text-secondary" />
              <p className="text-lg font-bold tracking-tight text-secondary-foreground leading-snug italic">
                 &quot;The safest way to find your next soulmate, guaranteed.&quot;
              </p>
              <p className="text-sm font-black uppercase tracking-widest text-secondary/60">— Sanctuary Council</p>
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-primary/5 border border-outline-variant/30 overflow-hidden">
          <div className="mb-10 space-y-2">
             <h2 className="text-3xl font-black tracking-tight">New Identity</h2>
             <p className="text-muted-foreground font-medium">Already have a key? <Link href="/login" className="text-primary hover:underline font-bold">Sign in</Link></p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
