import { type Request, type Response } from "express";

export function getGroups(req: Request, res: Response) {
  res.send("Get all groups");
}

export function getGroupById(req: Request, res: Response) {
  res.send("Get group by id");
}

export function createGroup(req: Request, res: Response) {
  res.send("Create group");
}

export function updateGroup(req: Request, res: Response) {
  res.send("Update group");
}

export function deleteGroup(req: Request, res: Response) {
  res.send("Delete group");
}

export function getGroupUsers(req: Request, res: Response) {
  res.send("Get group users");
}

export function getGroupManager(req: Request, res: Response) {
  res.send("Get group manager");
}

export function getGroupsForUser(req: Request, res: Response) {
  res.send("Get groups by user id");
}

export function addUserToGroup(req: Request, res: Response) {
  res.send("Add user to group");
}

export function deleteUserFromGroup(req: Request, res: Response) {
  res.send("Delete user from group");
}
