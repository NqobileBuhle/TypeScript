import { Request, Response } from "express";
import { createProduct, findProducts } from "../services/productServices";

export async function createProductHandler(req: Request, res: Response) {
    try {
      const userId = res.locals.user._id;
  
      const product = await createProduct({
        ...req.body,
        user: userId, // ← make sure this is included!
      });
  
      return res.status(201).send(product);
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  }
  
