import { type Request, type Response } from "express";

export function getUsers(_req: Request, res: Response) {
  res.send("Get all users");
}

export function getUserById(req: Request, res: Response) {
  res.send("Get user by id");
}

export function createUser(req: Request, res: Response) {
  res.send("Create user");
}

export function updateUser(req: Request, res: Response) {
  res.send("Update user");
}

export function deleteUser(req: Request, res: Response) {
  res.send("Delete user");
}
