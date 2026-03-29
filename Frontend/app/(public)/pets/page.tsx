import { getPets } from "@/lib/actions/pet";
import PetListingsClient from "./PetListingsClient";

export default async function PetListingsPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string };
}) {
  const filters: any = { status: "Available" };
  if (searchParams.search) {
    filters.$or = [
      { name: { $regex: searchParams.search, $options: "i" } },
      { breed: { $regex: searchParams.search, $options: "i" } },
    ];
  }
  if (searchParams.category && searchParams.category !== "All") {
    filters.category = searchParams.category;
  }

  const pets = await getPets(filters);

  return <PetListingsClient initialPets={pets} searchParams={searchParams} />;
}
