"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, PawPrint as Pets, Search } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm font-sans tracking-tight">
      <div className="flex items-center justify-between px-8 py-4 max-w-screen-2xl mx-auto">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
          <Pets className="h-6 w-6 text-primary" />
          PetSanctuary
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/pets" className="text-slate-600 dark:text-slate-300 font-medium hover:text-primary transition-colors">
            Adopt
          </Link>
          <Link href="/services" className="text-slate-600 dark:text-slate-300 font-medium hover:text-primary transition-colors">
            Services
          </Link>
          <Link href="/breeds" className="text-slate-600 dark:text-slate-300 font-medium hover:text-primary transition-colors">
            Breeds
          </Link>
          <Link href="/about" className="text-slate-600 dark:text-slate-300 font-medium hover:text-primary transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {!user ? (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" className="text-slate-600 dark:text-slate-300 font-medium hover:text-primary">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-full bg-primary hover:bg-primary/90 font-bold px-6">
                  Join Us
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {user.role === "buyer" && (
                <Link href="/buy-dashboard">
                  <Button variant="outline" className="hidden lg:flex rounded-full border-primary/20 hover:bg-primary/5">
                    My Sanctuary
                  </Button>
                </Link>
              )}
              {user.role === "seller" && (
                <Link href="/sell-dashboard">
                  <Button variant="outline" className="hidden lg:flex rounded-full border-primary/20 hover:bg-primary/5">
                    Seller Command
                  </Button>
                </Link>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer border-2 border-primary/20 hover:border-primary transition-colors">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl shadow-xl border-outline-variant/30">
                  <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/${user.role === 'buyer' ? 'buy' : 'sell'}-profile`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${user.role === 'buyer' ? 'buy' : 'sell'}-orders`}>Orders</Link>
                  </DropdownMenuItem>
                  {user.role === "seller" && (
                    <DropdownMenuItem asChild>
                      <Link href="/manage-pets">Manage Pets</Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive font-bold cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          
          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
