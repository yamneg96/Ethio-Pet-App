import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Pet from "@/models/Pet";
import { verifyToken } from "@/lib/auth";

// GET /api/pets/[id] - Get pet details
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const pet = await Pet.findById(params.id).populate("sellerId", "name email image phone address");
    if (!pet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }
    return NextResponse.json({ pet }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT /api/pets/[id] - Update pet (Seller only)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    await dbConnect();
    const pet = await Pet.findById(params.id);
    if (!pet) return NextResponse.json({ error: "Pet not found" }, { status: 404 });

    if (pet.sellerId.toString() !== decoded.id && decoded.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await req.json();
    const updatedPet = await Pet.findByIdAndUpdate(params.id, body, { new: true });

    return NextResponse.json({ message: "Pet updated successfully", pet: updatedPet }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/pets/[id] - Delete pet (Seller only)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    await dbConnect();
    const pet = await Pet.findById(params.id);
    if (!pet) return NextResponse.json({ error: "Pet not found" }, { status: 404 });

    if (pet.sellerId.toString() !== decoded.id && decoded.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    await Pet.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Pet deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
