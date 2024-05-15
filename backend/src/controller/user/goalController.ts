import { type Request, type Response } from "express";

export function getGoals(req: Request, res: Response) {
  res.send("Get all meals");
}

export function getGoalById(req: Request, res: Response) {
  res.send("Get goal by id");
}

export function createGoal(req: Request, res: Response) {
  res.send("Create goal");
}

export function updateGoal(req: Request, res: Response) {
  res.send("Update goal");
}

export function deleteGoal(req: Request, res: Response) {
  res.send("Delete goal");
}

export function getUserGoal(req: Request, res: Response) {
  res.send("Get user goal");
}
