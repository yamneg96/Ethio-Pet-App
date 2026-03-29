"use client";

import PetCard from "@/components/cards/PetCard";

export default function FeaturedPets({ pets }: { pets: any[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {pets.map((pet: any) => (
        <PetCard 
          key={pet._id} 
          id={pet._id}
          name={pet.name}
          breed={pet.breed}
          age={pet.age}
          price={pet.price}
          location={pet.location}
          image={pet.images[0]}
          category={pet.category}
        />
      ))}
    </div>
  );
}
