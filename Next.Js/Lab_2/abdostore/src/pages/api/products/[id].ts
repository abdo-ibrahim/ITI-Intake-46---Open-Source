import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoose";
import { Product } from "../../../models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { id }, method } = req;
  await dbConnect();

  switch (method) {
    case "GET": {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false });
      }
      res.status(200).json({ success: true, data: product });
      break;
    }

    case "PUT": {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        return res.status(404).json({ success: false });
      }
      res.status(200).json({ success: true, data: product });
      break;
    }

    case "DELETE": {
      const deletedProduct = await Product.deleteOne({ _id: id });
      if (deletedProduct.deletedCount === 0) {
        return res.status(404).json({ success: false });
      }
      res.status(200).json({ success: true, data: {} });
      break;
    }

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
