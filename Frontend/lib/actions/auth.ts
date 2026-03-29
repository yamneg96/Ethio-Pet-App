"use server";

import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { signToken, comparePassword, hashPassword, verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Missing fields" };

  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) return { error: "Invalid email or password" };

  const isValid = await comparePassword(password, user.password);
  if (!isValid) return { error: "Invalid email or password" };

  const token = signToken({ id: user._id, email: user.email, role: user.role, name: user.name });
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  if (!name || !email || !password || !role) return { error: "Missing fields" };

  await dbConnect();
  const existingUser = await User.findOne({ email });
  if (existingUser) return { error: "Email already exists" };

  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return { success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/login");
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    return verifyToken(token) as any;
  } catch (error) {
    return null;
  }
}
