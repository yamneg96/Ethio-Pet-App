import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Notification from "@/models/Notification";
import { verifyToken } from "@/lib/auth";

// PUT /api/notifications/[id] - Mark single notification as read
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    await dbConnect();
    const notification = await Notification.findOneAndUpdate({ _id: params.id, recipientId: decoded.id }, { isRead: true }, { new: true });

    if (!notification) return NextResponse.json({ error: "Notification not found" }, { status: 404 });

    return NextResponse.json({ message: "Notification marked as read", notification }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
