import { type Request, type Response } from "express";

export async function getUsers(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get all users");
}

export async function getUserById(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get user by id");
}

export async function createUser(req: Request, res: Response) {
  console.log(req.params);
  res.send("Create user");
}

export async function updateUser(req: Request, res: Response) {
  console.log(req.params);
  res.send("Update user");
}

export async function deleteUser(req: Request, res: Response) {
  console.log(req.params);
  res.send("Delete user");
}
