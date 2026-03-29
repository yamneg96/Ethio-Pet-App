import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import Pet from "@/models/Pet";
import Notification from "@/models/Notification";
import { verifyToken } from "@/lib/auth";

// GET /api/orders - Get orders for current user (Buyer or Seller)
export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    await dbConnect();
    let query = {};
    if (decoded.role === "buyer") {
      query = { buyerId: decoded.id };
    } else if (decoded.role === "seller") {
      query = { sellerId: decoded.id };
    } else if (decoded.role === "admin") {
      query = {};
    }

    const orders = await Order.find(query)
      .populate("petId")
      .populate("buyerId", "name email image")
      .populate("sellerId", "name email image")
      .sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/orders - Create a new order (Buyer only)
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded || decoded.role !== "buyer") {
      return NextResponse.json({ error: "Access denied. Buyers only." }, { status: 403 });
    }

    await dbConnect();
    const { petId, shippingAddress } = await req.json();

    if (!petId || !shippingAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const pet = await Pet.findById(petId);
    if (!pet || pet.status !== "Available") {
      return NextResponse.json({ error: "Pet not available" }, { status: 400 });
    }

    const order = await Order.create({
      buyerId: decoded.id,
      petId: pet._id,
      sellerId: pet.sellerId,
      totalAmount: pet.price,
      shippingAddress,
      status: "Pending",
      paymentStatus: "Pending",
    });

    // Notify Seller
    await Notification.create({
      recipientId: pet.sellerId,
      senderId: decoded.id,
      title: "New Order",
      message: `You have a new order for ${pet.name}`,
      type: "Order",
      link: `/seller/orders/${order._id}`,
    });

    return NextResponse.json({ message: "Order placed successfully", order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
