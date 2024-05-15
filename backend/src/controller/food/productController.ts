import { type Request, type Response } from "express";

export function getProducts(req: Request, res: Response) {
  res.send("Get all products");
}

export function getProductById(req: Request, res: Response) {
  res.send("Get product by id");
}

export function createProduct(req: Request, res: Response) {
  res.send("Create product");
}

export function updateProduct(req: Request, res: Response) {
  res.send("Update product");
}

export function deleteProduct(req: Request, res: Response) {
  res.send("Delete product");
}
