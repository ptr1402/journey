import { type Request, type Response } from "express";

export function getMealProducts(req: Request, res: Response) {
  res.send("Get all meal products");
}

export function getMealProductById(req: Request, res: Response) {
  res.send("Get meal product by id");
}

export function createMealProduct(req: Request, res: Response) {
  res.send("Create meal product");
}

export function getMealProductsByMealId(req: Request, res: Response) {
  res.send("Get meal products by meal id");
}

export function updateMealProduct(req: Request, res: Response) {
  res.send("Update meal product");
}

export function deleteMealProduct(req: Request, res: Response) {
  res.send("Delete meal product");
}
