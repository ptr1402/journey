import { type Request, type Response } from "express";

export async function getMeals(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get all meals");
}

export async function createMeal(req: Request, res: Response) {
  console.log(req.params);
  res.send("Create a new meal");
}

export async function getMealById(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get meal by id");
}

export async function updateMeal(req: Request, res: Response) {
  console.log(req.params);
  res.send("Update meal");
}

export async function deleteMeal(req: Request, res: Response) {
  console.log(req.params);
  res.send("Delete meal");
}
