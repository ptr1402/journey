import { type Request, type Response } from "express";

export function getJoinRequests(req: Request, res: Response) {
  res.send("Get all join requests");
}

export function getJoinRequestById(req: Request, res: Response) {
  res.send("Get join request by id");
}

export function createJoinRequest(req: Request, res: Response) {
  res.send("Create join request");
}

export function updateJoinRequest(req: Request, res: Response) {
  res.send("Update join request");
}

export function deleteJoinRequest(req: Request, res: Response) {
  res.send("Delete join request");
}

export function getGroupJoinRequests(req: Request, res: Response) {
  res.send("Get group join requests");
}
