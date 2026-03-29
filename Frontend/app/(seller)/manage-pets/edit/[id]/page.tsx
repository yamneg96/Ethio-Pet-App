import { getPetById } from "@/lib/actions/pet";
import EditPetForm from "./EditPetForm";
import { notFound } from "next/navigation";

export default async function EditPetPage({ params }: { params: { id: string } }) {
  const pet = await getPetById(params.id);

  if (!pet) return notFound();

  return <EditPetForm pet={pet} />;
}
