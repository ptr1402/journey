import { type Request, type Response } from "express";

export function getProfiles(req: Request, res: Response) {
  res.send("Get all profiles");
}

export function getProfileById(req: Request, res: Response) {
  res.send("Get profile by id");
}

export function createProfile(req: Request, res: Response) {
  res.send("Create profile");
}

export function updateProfile(req: Request, res: Response) {
  res.send("Update profile");
}

export function deleteProfile(req: Request, res: Response) {
  res.send("Delete profile");
}

export function getUserProfile(req: Request, res: Response) {
  res.send("Get user profile");
}
