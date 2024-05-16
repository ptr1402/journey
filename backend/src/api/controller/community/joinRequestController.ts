import { type Request, type Response } from "express";

export async function getJoinRequests(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get all join requests");
}

export async function getJoinRequestById(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get join request by id");
}

export async function createJoinRequest(req: Request, res: Response) {
  console.log(req.params);
  res.send("Create join request");
}

export async function updateJoinRequest(req: Request, res: Response) {
  console.log(req.params);
  res.send("Update join request");
}

export async function deleteJoinRequest(req: Request, res: Response) {
  console.log(req.params);
  res.send("Delete join request");
}

