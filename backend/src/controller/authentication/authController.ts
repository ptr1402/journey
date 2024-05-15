import { type Request, type Response } from "express";

export function login(req: Request, res: Response) {
  res.send("Login");
}

export function refresh(req: Request, res: Response) {
  res.send("Refresh");
}

export function logout(req: Request, res: Response) {
  res.send("Logout");
}
