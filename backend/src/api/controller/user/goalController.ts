import { type Request, type Response } from "express";

export async function getGoals(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get all goals");
}

export async function getGoalById(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get goal by id");
}

export async function createGoal(req: Request, res: Response) {
  console.log(req.params);
  res.send("Create goal");
}

export async function updateGoal(req: Request, res: Response) {
  console.log(req.params);
  res.send("Update goal");
}

export async function deleteGoal(req: Request, res: Response) {
  console.log(req.params);
  res.send("Delete goal");
}
