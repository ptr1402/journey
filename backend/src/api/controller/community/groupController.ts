import { type Request, type Response } from "express";

export async function getGroups(req: Request, res: Response) {
  console.log(req.params);

  const userId = req.query.userId as string | undefined;

  if (userId) {
    res.send(`Get groups for userId=${userId}`);
  } else {
    res.send("Get all groups");
  }
}

export async function getGroupById(req: Request, res: Response) {
  const groupId = req.params.groupId as string | undefined;
  res.send(`Get group with id=${groupId}`);
}

export async function createGroup(req: Request, res: Response) {
  console.log(req.params);
  res.send("Create group");
}

export async function updateGroup(req: Request, res: Response) {
  const groupId = req.params.groupId as string | undefined;
  res.send(`Update group with groupId=${groupId}`);
}

export async function deleteGroup(req: Request, res: Response) {
  const groupId = req.params.groupId as string | undefined;
  res.send(`Delete group with groupId=${groupId}`);
}

export async function getGroupUsers(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get group users");
}

export async function getGroupManager(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get group manager");
}

export async function addUserToGroup(req: Request, res: Response) {
  console.log(req.params);
  res.send("Add user to group");
}

export async function deleteUserFromGroup(req: Request, res: Response) {
  console.log(req.params);
  res.send("Delete user from group");
}
