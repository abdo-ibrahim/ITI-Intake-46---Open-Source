import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoose";
import { Product } from "../../../models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } else if (req.method === "POST") {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
