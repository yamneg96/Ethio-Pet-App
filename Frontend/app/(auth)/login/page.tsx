import { loginAction } from "@/lib/actions/auth";
import LoginForm from "./LoginForm";
import { PawPrint as Pets } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
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
                 Welcome <br /> <span className="text-primary italic underline decoration-primary/10">Back.</span>
              </h1>
              <p className="text-2xl text-muted-foreground font-medium max-w-md leading-relaxed">
                 Access your sanctuary, manage your adoptions, and connect with the family.
              </p>
           </div>
           
           <div className="flex gap-4">
              {[1,2,3].map(i => (
                 <div key={i} className="h-20 w-20 rounded-2xl bg-surface-container-high animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-primary/5 border border-outline-variant/30">
          <div className="mb-10 space-y-2">
             <h2 className="text-3xl font-black tracking-tight">Access Key</h2>
             <p className="text-muted-foreground font-medium">Don&apos;t have an identity? <Link href="/register" className="text-primary hover:underline font-bold">Create one</Link></p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
