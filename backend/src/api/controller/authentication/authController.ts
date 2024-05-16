import { type Request, type Response } from "express";

export async function login(req: Request, res: Response) {
  console.log(req.params);
  res.send("Login");
}

export async function refresh(req: Request, res: Response) {
  console.log(req.params);
  res.send("Refresh");
}

export async function logout(req: Request, res: Response) {
  console.log(req.params);
  res.send("Logout");
}
