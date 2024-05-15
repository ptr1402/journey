import { type Request, type Response } from "express";

export function getPosts(req: Request, res: Response) {
  res.send("Get all posts");
}

export function getPostById(req: Request, res: Response) {
  res.send("Get post by id");
}

export function createPost(req: Request, res: Response) {
  res.send("Create post");
}

export function updatePost(req: Request, res: Response) {
  res.send("Update post");
}

export function deletePost(req: Request, res: Response) {
  res.send("Delete post");
}

export function getGroupPosts(req: Request, res: Response) {
  res.send("Get all posts from group");
}

export function getUserPosts(req: Request, res: Response) {
  res.send("Get all posts for user");
}
