import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Listing from "@/models/Listing";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectDB();
    const listing = await Listing.create(body);
    return NextResponse.json({ id: listing._id }, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const listings = await Listing.find({})
      .sort({ createdAt: -1 })
      .limit(24)
      .lean();
    return NextResponse.json(listings, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
