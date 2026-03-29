import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Star } from "lucide-react";

interface PetCardProps {
  id: string;
  name: string;
  breed: string;
  age: string;
  price: number;
  location: string;
  image: string;
  category: string;
  isVerified?: boolean;
  isEditorsChoice?: boolean;
}

export default function PetCard({
  id,
  name,
  breed,
  age,
  price,
  location,
  image,
  category,
  isVerified,
  isEditorsChoice,
}: PetCardProps) {
  return (
    <div className="group cursor-pointer">
      <Link href={`/pets/${id}`}>
        <div className="relative mb-6">
          <div className="rounded-xl overflow-hidden aspect-[4/3] bg-muted">
            <Image
              src={image}
              alt={name}
              width={600}
              height={450}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isVerified && (
              <Badge className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border-none">
                <ShieldCheck className="h-3 w-3" />
                Verified Health
              </Badge>
            )}
            {isEditorsChoice && (
              <Badge className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border-none">
                <Star className="h-3 w-3 fill-current" />
                Editor's Choice
              </Badge>
            )}
          </div>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-black tracking-tight mb-1 text-on-surface">{name}</h3>
            <p className="text-muted-foreground font-medium text-sm">
              {breed} • {age}
            </p>
          </div>
          <div className="text-right">
            <p className="text-primary font-black text-xl">${price.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              {location}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
