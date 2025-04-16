import Product, { ProductDocument } from "../models/productModel";
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

// Create Product
export function createProduct(
  input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>
) {
  return Product.create(input);
}

// Get All Products
export function findProducts() {
  return Product.find().lean();
}

// ✅ Get One Product by ID
export function findProductById(productId: string) {
  return Product.findById(productId).lean();
}

// ✅ Update Product
export function updateProduct(
  productId: string,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions = { new: true }
) {
  return Product.findByIdAndUpdate(productId, update, options).lean();
}

// ✅ Delete Product
export function deleteProduct(productId: string) {
  return Product.findByIdAndDelete(productId);
}
