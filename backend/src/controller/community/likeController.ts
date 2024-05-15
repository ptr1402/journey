import { type Request, type Response } from "express";

export function getLikes(req: Request, res: Response) {
  res.send("Get all likes");
}

export function getLikeById(req: Request, res: Response) {
  res.send("Get like by id");
}

export function getPostLikes(req: Request, res: Response) {
  res.send("Get post likes");
}

export function createLike(req: Request, res: Response) {
  res.send("Create like");
}

export function deleteLike(req: Request, res: Response) {
  res.send("Delete like");
}
