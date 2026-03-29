import Link from "next/link";
import { Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 bg-surface-container-low border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-2xl mx-auto gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-lg font-black text-slate-900 tracking-tighter">PetSanctuary</div>
          <p className="text-slate-400 font-sans text-xs tracking-wide uppercase">
            © 2024 PetSanctuary Editorial. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <Link href="/privacy" className="text-slate-400 font-sans text-xs tracking-wide uppercase hover:text-slate-900 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-slate-400 font-sans text-xs tracking-wide uppercase hover:text-slate-900 transition-colors">
            Terms of Service
          </Link>
          <Link href="/cookies" className="text-slate-400 font-sans text-xs tracking-wide uppercase hover:text-slate-900 transition-colors">
            Cookie Settings
          </Link>
          <Link href="/contact" className="text-slate-400 font-sans text-xs tracking-wide uppercase hover:text-slate-900 transition-colors">
            Contact Support
          </Link>
        </div>

        <div className="flex gap-4">
          <Link
            href="#"
            className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-slate-600 hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Globe className="h-4 w-4" />
          </Link>
          <Link
            href="#"
            className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-slate-600 hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Share2 className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
