import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({}).sort({ id: 1 });

    if (products.length === 0) {
      console.log("Database empty, seeding from dummyjson...");
      const res = await fetch("https://dummyjson.com/products?limit=30");
      const data = await res.json();

      if (data && data.products) {
        const seededProducts = await Product.insertMany(data.products);
        console.log("Successfully seeded database with dummyjson products");
        return NextResponse.json(seededProducts);
      }
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching/seeding products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

