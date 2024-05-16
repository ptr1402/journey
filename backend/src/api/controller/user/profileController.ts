import { type Request, type Response } from "express";

export async function getProfiles(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get all profiles");
}

export async function getProfileById(req: Request, res: Response) {
  console.log(req.params);
  res.send("Get profile by id");
}

export async function createProfile(req: Request, res: Response) {
  console.log(req.params);
  res.send("Create profile");
}

export async function updateProfile(req: Request, res: Response) {
  console.log(req.params);
  res.send("Update profile");
}

export async function deleteProfile(req: Request, res: Response) {
  console.log(req.params);
  res.send("Delete profile");
}
