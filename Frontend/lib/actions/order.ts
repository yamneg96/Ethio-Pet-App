"use server";

import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import Pet from "@/models/Pet";
import { getSession } from "./auth";
import { revalidatePath } from "next/cache";

export async function getOrders(query: any = {}) {
  const session = await getSession();
  if (!session) return [];

  await dbConnect();
  const filter = session.role === "admin" ? query : 
                 session.role === "seller" ? { ...query } : // Seller needs specialized logic to see orders of their pets
                 { ...query, buyerId: session.id };

  const orders = await Order.find(filter).populate("petId buyerId sellerId").sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(orders));
}

export async function getOrderById(id: string) {
  const session = await getSession();
  if (!session) return null;

  await dbConnect();
  const order = await Order.findById(id).populate("petId buyerId sellerId");
  if (!order) return null;

  // Permission check
  const isBuyer = order.buyerId._id.toString() === session.id;
  const isSeller = order.sellerId._id.toString() === session.id;
  const isAdmin = session.role === "admin";

  if (!isBuyer && !isSeller && !isAdmin) return null;

  return JSON.parse(JSON.stringify(order));
}

export async function createOrderAction(petId: string, shippingAddress: string) {
  const session = await getSession();
  if (!session) return { error: "Login required" };

  await dbConnect();
  const pet = await Pet.findById(petId);
  if (!pet || pet.status !== "Available") return { error: "Pet not available" };

  const order = await Order.create({
    buyerId: session.id,
    sellerId: pet.sellerId,
    petId: pet._id,
    totalAmount: pet.price,
    shippingAddress,
    paymentStatus: "Pending",
    status: "Pending",
  });

  // Automatically update pet status
  await Pet.findByIdAndUpdate(petId, { status: "Sold" });

  revalidatePath("/buyer/orders");
  revalidatePath("/seller/dashboard");
  revalidatePath(`/pets/${petId}`);
  
  return { success: true, order: JSON.parse(JSON.stringify(order)) };
}

export async function updateOrderStatusAction(orderId: string, status: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  await dbConnect();
  const order = await Order.findById(orderId);
  if (!order) return { error: "Order not found" };

  // Permission check
  const isSeller = order.sellerId.toString() === session.id;
  const isAdmin = session.role === "admin";
  if (!isSeller && !isAdmin) return { error: "Access denied" };

  order.status = status as any;
  await order.save();

  revalidatePath("/seller/dashboard");
  revalidatePath("/buyer/orders");
  revalidatePath(`/buyer/orders/${orderId}`);
  
  return { success: true };
}
