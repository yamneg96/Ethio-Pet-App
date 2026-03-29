"use client";

import { useState } from "react";
import { 
  Users, 
  PawPrint, 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Edit3,
  Search,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function AdminDashboardClient({ initialUsers, initialPets }: { initialUsers: any[], initialPets: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    { label: "Total Users", value: initialUsers.length, icon: Users, color: "bg-blue-600" },
    { label: "Active Listings", value: initialPets.filter(p => p.status === "Available").length, icon: PawPrint, color: "bg-emerald-600" },
    { label: "Pending Approvals", value: initialUsers.filter(u => u.status === "Pending").length, icon: ShieldAlert, color: "bg-amber-600" },
    { label: "Platform Activity", value: "High", icon: Activity, color: "bg-purple-600" },
  ];

  const filteredUsers = initialUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter mb-2">Nexus <span className="text-primary italic">Control</span></h1>
        <p className="text-muted-foreground font-medium">Global marketplace oversight and moderation tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-surface-container-low overflow-hidden group">
            <CardContent className="p-8 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">{stat.label}</p>
                <h3 className="text-4xl font-black tracking-tighter">{stat.value}</h3>
              </div>
              <div className={`h-14 w-14 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-7 w-7" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="users" className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <TabsList className="bg-surface-container-high p-1 h-14 rounded-2xl">
            <TabsTrigger value="users" className="rounded-xl px-8 font-black data-[state=active]:bg-background data-[state=active]:shadow-sm">Users</TabsTrigger>
            <TabsTrigger value="pets" className="rounded-xl px-8 font-black data-[state=active]:bg-background data-[state=active]:shadow-sm">Listings</TabsTrigger>
          </TabsList>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search data..." 
              className="pl-10 h-12 rounded-xl bg-surface-container-low border-none focus:ring-2 ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="users">
          <Card className="border-none shadow-sm bg-surface-container-low rounded-[2.5rem] overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-outline-variant">
                         <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">User Identity</th>
                         <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">Role</th>
                         <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">Status</th>
                         <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-outline-variant">
                      {filteredUsers.map((user) => (
                         <tr key={user._id} className="group hover:bg-surface-container-high transition-colors">
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black">
                                     {user.name.charAt(0)}
                                  </div>
                                  <div>
                                     <p className="font-black tracking-tight">{user.name}</p>
                                     <p className="text-xs font-medium text-muted-foreground italic">{user.email}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <Badge className="bg-surface-container-highest text-on-surface border-none rounded-full px-4 py-1 font-black uppercase text-[10px]">
                                  {user.role}
                               </Badge>
                            </td>
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-2">
                                  <span className={`h-2 w-2 rounded-full ${user.status === 'Verified' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                  <span className="text-sm font-bold">{user.status}</span>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/20 hover:text-primary"><Eye className="h-4 w-4" /></Button>
                                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-emerald-200/50 hover:text-emerald-700"><CheckCircle2 className="h-4 w-4" /></Button>
                                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-destructive/10 hover:text-destructive"><XCircle className="h-4 w-4" /></Button>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </Card>
        </TabsContent>

        <TabsContent value="pets">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {initialPets.slice(0, 6).map((pet) => (
                <Card key={pet._id} className="border-none shadow-sm bg-surface-container-low overflow-hidden group">
                   <div className="aspect-[16/10] relative overflow-hidden">
                      <Image src={pet.images[0]} alt={pet.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4">
                         <Badge className="bg-black/40 backdrop-blur-md text-white border-none rounded-full px-4 font-black text-[10px] uppercase">
                            {pet.status}
                         </Badge>
                      </div>
                   </div>
                   <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                         <div>
                            <h4 className="text-xl font-black tracking-tight">{pet.name}</h4>
                            <p className="text-sm font-medium text-muted-foreground italic">{pet.breed}</p>
                         </div>
                         <p className="text-lg font-black text-primary tracking-tighter">${pet.price}</p>
                      </div>
                      <div className="flex gap-2">
                         <Button className="flex-1 rounded-xl font-bold" variant="outline" size="sm">Manage</Button>
                         <Button className="rounded-xl" variant="destructive" size="sm"><XCircle className="h-4 w-4" /></Button>
                      </div>
                   </CardContent>
                </Card>
             ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
