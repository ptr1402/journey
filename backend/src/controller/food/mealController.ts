import { type Request, type Response } from "express";

export function getMeals(req: Request, res: Response) {
  res.send("Get all meals");
}

export function getMealById(req: Request, res: Response) {
  res.send("Get meal by id");
}

export function getUserMeals(req: Request, res: Response) {
  res.send("Get meals by user id");
}

export function getUserMealsByDate(req: Request, res: Response) {
  res.send("Get meals by date");
}

export function updateMeal(req: Request, res: Response) {
  res.send("Update meal");
}

export function deleteMeal(req: Request, res: Response) {
  res.send("Delete meal");
}
