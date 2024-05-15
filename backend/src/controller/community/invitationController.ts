import { type Request, type Response } from "express";

export function getInvitations(req: Request, res: Response) {
  res.send("Get all invitations");
}

export function getInvitationById(req: Request, res: Response) {
  res.send("Get invitation");
}

export function createInvitation(req: Request, res: Response) {
  res.send("Create invitation");
}

export function updateInvitation(req: Request, res: Response) {
  res.send("Update invitation");
}

export function deleteInvitation(req: Request, res: Response) {
  res.send("Delete invitation");
}

export function getUserInvitations(req: Request, res: Response) {
  res.send("Get user invitations");
}

export function getGroupInvitations(req: Request, res: Response) {
  res.send("Get group invitations");
}
