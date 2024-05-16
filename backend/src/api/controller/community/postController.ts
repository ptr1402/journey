import { type Request, type Response } from "express";

export async function getPosts(req: Request, res: Response) {
  console.log(req.params);

  const groupId = req.query.groupId as string | undefined;

  if (groupId) {
    res.send(`Get posts for groupId=${groupId}`);
  } else {
    res.send("Get all groups");
  }
}

export async function getPostById(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get post by id");
}

export async function createPost(req: Request, res: Response) {
  console.log(req.params);

  const groups = req.body.groups as string[] | undefined;

  if (!groups) {
    res.send("No groups");
  } else {
    res.send(`Create post for groups: ${groups}`);
  }
}

export async function updatePost(req: Request, res: Response) {
  console.log(req.params);
  res.send("Update post");
}

export async function deletePost(req: Request, res: Response) {
  console.log(req.params);
  res.send("Delete post");
}
