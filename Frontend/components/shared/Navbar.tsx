"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
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
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm font-sans tracking-tight">
      <div className="flex items-center justify-between px-8 py-4 max-w-screen-2xl mx-auto">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">
          PetSanctuary
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/pets" className="text-primary font-semibold border-b-2 border-primary transition-colors">
            Adopt
          </Link>
          <Link href="/services" className="text-slate-600 font-medium hover:text-primary transition-colors">
            Services
          </Link>
          <Link href="/breeds" className="text-slate-600 font-medium hover:text-primary transition-colors">
            Breeds
          </Link>
          <Link href="/about" className="text-slate-600 font-medium hover:text-primary transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-slate-600 font-medium hover:text-primary">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-primary text-primary-foreground rounded-full px-6 py-2 font-semibold">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {user.role === "buyer" && (
                <Link href="/buy-dashboard">
                  <Button variant="outline" className="hidden sm:flex rounded-full">
                    My Sanctuary
                  </Button>
                </Link>
              )}
              {user.role === "seller" && (
                <Link href="/sell-dashboard">
                  <Button variant="outline" className="hidden sm:flex rounded-full">
                    Seller Command
                  </Button>
                </Link>
              )}
              {user.role === "admin" && (
                <Link href="/admin/dashboard">
                  <Button variant="outline" className="hidden sm:flex rounded-full">
                    Admin
                  </Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer border-2 border-primary/20">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/${user.role === 'buyer' ? 'buy' : 'sell'}-profile`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${user.role === 'buyer' ? 'buy' : 'sell'}-orders`}>Orders</Link>
                  </DropdownMenuItem>
                  {user.role === "seller" && (
                    <DropdownMenuItem asChild>
                      <Link href="/seller/manage-pets">Manage Pets</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
