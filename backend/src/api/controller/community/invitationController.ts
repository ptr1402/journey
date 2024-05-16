import { type Request, type Response } from "express";

export async function getInvitations(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get all invitations");
}

export async function getInvitationById(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get invitation");
}

export async function createInvitation(req: Request, res: Response) {
  console.log(req.params);
  res.send("Create invitation");
}

export async function updateInvitation(req: Request, res: Response) {
  console.log(req.params);
  res.send("Update invitation");
}

export async function deleteInvitation(req: Request, res: Response) {
  console.log(req.params);
  res.send("Delete invitation");
}
