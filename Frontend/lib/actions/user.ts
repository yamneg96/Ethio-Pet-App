"use server";

import dbConnect from "@/lib/db";
import User from "@/models/User";
import { getSession } from "./auth";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  const session = await getSession();
  if (!session) return null;

  await dbConnect();
  const user = await User.findById(session.id).select("-password");
  return JSON.parse(JSON.stringify(user));
}

export async function updateProfileAction(data: any) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  await dbConnect();
  const user = await User.findByIdAndUpdate(session.id, data, { new: true }).select("-password");

  revalidatePath(`/${session.role}/profile`);
  return { success: true, user: JSON.parse(JSON.stringify(user)) };
}

export async function getUsersAction() {
  const session = await getSession();
  if (!session || session.role !== "admin") return [];

  await dbConnect();
  const users = await User.find({}).select("-password").sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(users));
}
