import Hero from "@/components/home/Hero";
import FeaturedPets from "@/components/home/FeaturedPets";
import Categories from "@/components/home/Categories";
import CTA from "@/components/home/CTA";
import { getPets } from "@/lib/actions/pet";

export default async function Home() {
  const featuredPets = await getPets({ status: "Available" });

  return (
    <main className="min-h-screen bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="px-8 pt-6 pb-20">
        <Hero />
      </section>

      {/* Categories */}
      <section className="px-8 py-20 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-4">
               <h2 className="text-sm font-black uppercase tracking-widest text-primary">Discover</h2>
               <p className="text-6xl font-black tracking-tighter italic">Species <span className="text-on-surface not-italic">Sanctuary</span></p>
            </div>
          </div>
          <Categories />
        </div>
      </section>

      {/* Featured Pets */}
      <section className="px-8 py-32">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
            <div className="space-y-4">
               <h2 className="text-sm font-black uppercase tracking-widest text-secondary">New Arrivals</h2>
               <p className="text-6xl font-black tracking-tighter leading-none">Find your next <br /> <span className="text-secondary italic underline decoration-secondary/30">soulmate.</span></p>
            </div>
            <p className="text-xl text-muted-foreground font-medium max-w-md">Our newest residents are waiting to meet their forever families. Every pet is verified and health-checked.</p>
          </div>
          <FeaturedPets pets={featuredPets.slice(0, 4)} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 pb-32">
        <CTA />
      </section>
    </main>
  );
}
