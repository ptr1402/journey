import { type Request, type Response } from "express";

export async function getLikes(req: Request, res: Response) {
  console.log(req.params);

  const postId = req.query.postId as string | undefined;

  if (postId) {
    res.send(`Get likes for postId=${postId}`);
  } else {
    res.send("Get all likes");
  }
}

export async function getLikeById(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get like by id");
}

export async function createLike(req: Request, res: Response) {
  console.log(req.params);
  res.send("Create like");
}

export async function deleteLike(req: Request, res: Response) {
  console.log(req.params);
  res.send("Delete like");
}
