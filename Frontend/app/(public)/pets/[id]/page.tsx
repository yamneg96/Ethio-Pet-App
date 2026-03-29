import { getPetById } from "@/lib/actions/pet";
import PetDetailsClient from "./PetDetailsClient";
import { notFound } from "next/navigation";

export default async function PetDetailsPage({ params }: { params: { id: string } }) {
  const pet = await getPetById(params.id);

  if (!pet) return notFound();

  return <PetDetailsClient pet={pet} />;
}
