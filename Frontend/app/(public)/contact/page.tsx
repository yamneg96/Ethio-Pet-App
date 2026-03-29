"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  Clock, 
  ShieldCheck,
  Instagram,
  Twitter,
  Facebook
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-24">
      <div className="grid lg:grid-cols-2 gap-24">
        {/* Left Side - Info */}
        <div className="space-y-16">
          <div className="space-y-8">
            <Badge className="bg-secondary/10 text-secondary border-none rounded-full px-6 py-2 font-black text-xs uppercase tracking-[0.2em]">Contact Us</Badge>
            <h1 className="text-7xl font-black tracking-tighter leading-none text-on-surface">
              We&apos;re here for <br />
              <span className="text-secondary italic">every</span> journey.
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-lg leading-relaxed">
              Whether you&apos;re starting your adoption story or looking to list a new companion, our dedicated support team is available 24/7.
            </p>
          </div>

          <div className="space-y-10">
             <div className="flex items-start gap-8 group">
                <div className="h-16 w-16 rounded-[2rem] bg-surface-container-low border border-outline-variant flex items-center justify-center text-secondary shadow-sm transition-transform group-hover:scale-110">
                   <Mail className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                   <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">Digital Desk</p>
                   <p className="text-2xl font-black tracking-tight underline underline-offset-8 decoration-secondary/30">hi@petsanctuary.com</p>
                </div>
             </div>
             <div className="flex items-start gap-8 group">
                <div className="h-16 w-16 rounded-[2rem] bg-surface-container-low border border-outline-variant flex items-center justify-center text-secondary shadow-sm transition-transform group-hover:scale-110">
                   <Phone className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                   <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">Direct Voice</p>
                   <p className="text-2xl font-black tracking-tight underline underline-offset-8 decoration-secondary/30">+1 (888) PETS-LOVE</p>
                </div>
             </div>
             <div className="flex items-start gap-8 group">
                <div className="h-16 w-16 rounded-[2rem] bg-surface-container-low border border-outline-variant flex items-center justify-center text-secondary shadow-sm transition-transform group-hover:scale-110">
                   <Clock className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                   <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">Opening Hours</p>
                   <p className="text-2xl font-black tracking-tight leading-none italic">Always Open, Always Caring.</p>
                </div>
             </div>
          </div>

          <div className="bg-surface-container-low p-10 rounded-[3rem] border border-outline-variant flex items-center gap-6">
             <div className="bg-background h-16 w-16 rounded-[2rem] flex items-center justify-center shadow-lg">
                <ShieldCheck className="h-8 w-8 text-secondary" />
             </div>
             <div>
                <h4 className="text-lg font-black tracking-tight mb-1">Encrypted Communication</h4>
                <p className="text-sm font-medium text-muted-foreground">Your messages are private and protected by world-class security.</p>
             </div>
          </div>

          <div className="flex gap-4">
             {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <button key={i} className="h-14 w-14 rounded-2xl bg-surface-container-level-higher flex items-center justify-center border border-outline-variant text-on-surface-variant hover:bg-secondary hover:text-white transition-all hover:-translate-y-1">
                   <Icon className="h-6 w-6" />
                </button>
             ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-surface-container-low p-16 rounded-[4rem] border border-outline-variant shadow-2xl relative">
          <div className="space-y-10">
            <div className="space-y-4">
               <h2 className="text-4xl font-black tracking-tighter">Send a Request</h2>
               <p className="text-muted-foreground font-medium">Expected response time is under 15 minutes.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest ml-1">Your Name</Label>
                  <Input placeholder="John Doe" className="h-16 rounded-2xl bg-background border-none focus:ring-secondary pl-6" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest ml-1">Email Connection</Label>
                  <Input placeholder="john@example.com" className="h-16 rounded-2xl bg-background border-none focus:ring-secondary pl-6" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest ml-1">Topic</Label>
                <select className="w-full h-16 rounded-2xl bg-background border-none focus:ring-secondary pl-6 outline-none text-sm font-bold appearance-none">
                  <option>Adoption Inquiry</option>
                  <option>Breeder Verification</option>
                  <option>Technical Support</option>
                  <option>Partnership Proposal</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest ml-1">Message</Label>
                <textarea 
                  className="w-full min-h-[180px] p-6 rounded-3xl bg-background border-none focus:ring-secondary outline-none text-sm font-medium leading-relaxed"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>

              <Button type="submit" className="w-full h-20 rounded-[2rem] text-xl font-black bg-secondary shadow-xl shadow-secondary/20 hover:scale-[1.02] transition-transform group">
                Send Message
                <Send className="ml-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
