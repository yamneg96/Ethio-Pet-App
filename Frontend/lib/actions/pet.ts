"use server";

import dbConnect from "@/lib/db";
import Pet from "@/models/Pet";
import { getSession } from "./auth";
import { revalidatePath } from "next/cache";

export async function getPets(query: any = {}) {
  await dbConnect();
  const pets = await Pet.find(query).populate("sellerId", "name email").sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(pets));
}

export async function getPetById(id: string) {
  await dbConnect();
  const pet = await Pet.findById(id).populate("sellerId", "name email");
  return JSON.parse(JSON.stringify(pet));
}

export async function createPetAction(data: any) {
  const session = await getSession();
  if (!session || session.role !== "seller") return { error: "Unauthorized" };

  await dbConnect();
  const pet = await Pet.create({
    ...data,
    sellerId: session.id,
  });

  revalidatePath("/pets");
  revalidatePath("/seller/manage-pets");
  return { success: true, pet: JSON.parse(JSON.stringify(pet)) };
}

export async function updatePetAction(id: string, data: any) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  await dbConnect();
  const pet = await Pet.findById(id);
  if (!pet || pet.sellerId.toString() !== session.id && session.role !== "admin") {
    return { error: "Access denied" };
  }

  const updatedPet = await Pet.findByIdAndUpdate(id, data, { new: true });
  
  revalidatePath(`/pets/${id}`);
  revalidatePath("/pets");
  revalidatePath("/seller/manage-pets");
  return { success: true, pet: JSON.parse(JSON.stringify(updatedPet)) };
}

export async function deletePetAction(id: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  await dbConnect();
  const pet = await Pet.findById(id);
  if (!pet || pet.sellerId.toString() !== session.id && session.role !== "admin") {
    return { error: "Access denied" };
  }

  await Pet.findByIdAndDelete(id);
  
  revalidatePath("/pets");
  revalidatePath("/seller/manage-pets");
  return { success: true };
}
