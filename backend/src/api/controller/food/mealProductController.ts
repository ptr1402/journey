import { type Request, type Response } from "express";

export async function getMealProducts(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get all meal products");
}

export async function getMealProductById(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get meal product by id");
}

export async function createMealProduct(req: Request, res: Response) {
  console.log(req.params);
  res.send("Create meal product");
}

export async function updateMealProduct(req: Request, res: Response) {
  console.log(req.params);
  res.send("Update meal product");
}

export async function deleteMealProduct(req: Request, res: Response) {
  console.log(req.params);
  res.send("Delete meal product");
}
