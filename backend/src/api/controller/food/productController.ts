import { type Request, type Response } from "express";

export async function getProducts(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get all products");
}

export async function getProductById(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get product by id");
}

export async function createProduct(req: Request, res: Response) {
  console.log(req.params);
  res.send("Create product");
}

export async function updateProduct(req: Request, res: Response) {
  console.log(req.params);
  res.send("Update product");
}

export async function deleteProduct(req: Request, res: Response) {
  console.log(req.params);
  res.send("Delete product");
}
