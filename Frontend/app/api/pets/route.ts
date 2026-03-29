import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Pet from "@/models/Pet";
import { verifyToken } from "@/lib/auth";

// GET /api/pets - List all pets or search
export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const breed = searchParams.get("breed");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");

    let query: any = { status: "Available" };

    if (category) query.category = category;
    if (breed) query.breed = new RegExp(breed, "i");
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { breed: new RegExp(search, "i") },
        { category: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }

    const pets = await Pet.find(query).sort({ createdAt: -1 }).populate("sellerId", "name email image");
    return NextResponse.json({ pets }, { status: 200 });
  } catch (error: any) {
    console.error("Get pets error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/pets - Create a new pet (Seller only)
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = verifyToken(token);
    if (!decoded || (decoded.role !== "seller" && decoded.role !== "admin")) {
      return NextResponse.json({ error: "Access denied. Sellers only." }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();
    const { name, category, breed, age, gender, price, description, images, location } = body;

    if (!name || !category || !breed || !age || !gender || !price || !description || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const pet = await Pet.create({
      ...body,
      sellerId: decoded.id,
      status: "Available",
    });

    return NextResponse.json({ message: "Pet listed successfully", pet }, { status: 201 });
  } catch (error: any) {
    console.error("Create pet error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
