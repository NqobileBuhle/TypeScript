import Product, { ProductDocument } from "../models/productModel";
import { DocumentDefinition } from "mongoose";

export function createProduct(input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>) {
  return Product.create(input);
}

export function findProducts() {
  return Product.find().lean();
}
