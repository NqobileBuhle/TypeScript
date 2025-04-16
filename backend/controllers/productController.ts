import { Request, Response } from "express";
import {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
} from "../services/productServices";

// Create Product
export async function createProductHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;

    const product = await createProduct({
      ...req.body,
      user: userId,
    });

    return res.status(201).send(product);
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
}

// Get All Products
export async function getProductsHandler(req: Request, res: Response) {
  try {
    const products = await findProducts();
    return res.status(200).send(products);
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
}

// Get Product by ID
export async function getProductHandler(req: Request, res: Response) {
  const productId = req.params.productId;

  const product = await findProductById(productId);
  if (!product) {
    return res.status(404).send("Product not found");
  }

  return res.send(product);
}

// Update Product
export async function updateProductHandler(req: Request, res: Response) {
  const productId = req.params.productId;
  const userId = res.locals.user._id;

  const product = await findProductById(productId);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  // Optional: only allow the user who created it to update
  if (String(product.user) !== String(userId)) {
    return res.status(403).send("Forbidden: Not your product");
  }

  const updated = await updateProduct(productId, req.body);
  return res.send(updated);
}

// Delete Product
export async function deleteProductHandler(req: Request, res: Response) {
  const productId = req.params.productId;
  const userId = res.locals.user._id;

  const product = await findProductById(productId);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  if (String(product.user) !== String(userId)) {
    return res.status(403).send("Forbidden: Not your product");
  }

  await deleteProduct(productId);
  return res.status(204).send();
}
