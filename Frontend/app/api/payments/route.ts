import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import Pet from "@/models/Pet";
import { verifyToken } from "@/lib/auth";

// POST /api/payments - Mock payment process
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
    const { orderId, paymentMethod } = await req.json();

    if (!orderId || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await Order.findById(orderId);
    if (!order || order.buyerId.toString() !== decoded.id) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.paymentStatus === "Completed") {
      return NextResponse.json({ error: "Order already paid" }, { status: 400 });
    }

    // Mock successful payment
    const transactionId = "TXN_" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const payment = await Payment.create({
      orderId: order._id,
      transactionId,
      amount: order.totalAmount,
      status: "Succeeded",
      method: paymentMethod,
    });

    // Update Order Status
    order.paymentStatus = "Completed";
    order.status = "Paid";
    await order.save();

    // Mark Pet as Sold
    await Pet.findByIdAndUpdate(order.petId, { status: "Sold" });

    return NextResponse.json({ message: "Payment successful", payment }, { status: 201 });
  } catch (error: any) {
    console.error("Payment error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
