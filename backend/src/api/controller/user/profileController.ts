import { type Request, type Response } from "express";
import { InsertProfile, SelectProfile } from "../../database/schema";
import {
  createProfileDb,
  deleteProfileDb,
  getProfileByIdDb,
  getProfileByUserIdDb,
  getProfilesDb,
  updateProfileDb,
} from "../../database/queries/user/profile";
import { validUser } from "../utils/validation";

function validateProfile(profileData: InsertProfile): string[] {
  const errors: string[] = [];

  if (profileData.birthday) {
    const isValidDate = !isNaN(Date.parse(profileData.birthday));
    if (!isValidDate) {
      errors.push("Invalid birthday format. Please provide a valid date.");
    }
  }

  if (profileData.height) {
    if (!Number.isInteger(profileData.height)) {
      errors.push("Invalid height. Height must be an integer.");
    } else if (profileData.height <= 0) {
      errors.push("Invalid height. Height must be a positive number.");
    }
  }

  if (profileData.weight) {
    if (isNaN(profileData.weight) || !isFinite(profileData.weight)) {
      errors.push("Invalid weight. Weight must be a real number.");
    } else if (profileData.weight <= 0) {
      errors.push("Invalid weight. Weight must be a positive number.");
    }
  }

  if (profileData.bio && profileData.bio.length > 128) {
    errors.push("Invalid bio. Bio length cannot exceed 128 characters.");
  }

  return errors;
}

export async function getProfiles(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string;

    if (userId) {
      const user = parseInt(userId, 10);
      if (isNaN(user)) {
        return res.status(400).json({ error: "Invalid userId." });
      }

      const profile: SelectProfile[] = await getProfileByUserIdDb(user);

      if (profile.length === 0) {
        return res
          .status(404)
          .json({ error: `There is no user with userId=${userId}` });
      }

      return res.status(200).json(profile[0]);
    }

    const profiles: SelectProfile[] = await getProfilesDb();
    return res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getProfileById(req: Request, res: Response) {
  try {
    const profileId = parseInt(req.params.profileId, 10);

    if (isNaN(profileId)) {
      return res.status(400).json({ error: "Invalid profileId." });
    }

    const profile: SelectProfile[] = await getProfileByIdDb(profileId);

    if (profile.length === 0) {
      return res.status(404).json({ error: "Profile not found." });
    }

    return res.status(201).json(profile[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function createProfile(req: Request, res: Response) {
  try {
    const profileData: InsertProfile = req.body;

    const errors: string[] = await validUser(profileData.userId);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const dataErrors: string[] = validateProfile(profileData);
    if (dataErrors.length > 0) {
      return res.status(400).json({ dataErrors });
    }

    await createProfileDb(profileData);

    return res.status(201).json({ message: "Profile created successfully" });
  } catch (error) {
    console.error("Error creating profile: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const profileId: SelectProfile["id"] = parseInt(req.params.profileId, 10);

    if (isNaN(profileId)) {
      return res.status(400).json({ error: "Invalid profile ID." });
    }

    const existingProfile = await getProfileByIdDb(profileId);
    if (!existingProfile || existingProfile.length === 0) {
      return res
        .status(404)
        .json({ error: `Profile not found for profileId=${profileId}` });
    }

    const profileData: Partial<Omit<SelectProfile, "id">> = req.body;

    const validationErrors = validateProfile(profileData as InsertProfile);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    await updateProfileDb(profileId, profileData);

    return res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function deleteProfile(req: Request, res: Response) {
  try {
    const id: SelectProfile["id"] = parseInt(req.params.profileId, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid profileId" });
    }

    const profile = await getProfileByIdDb(id);

    if (profile?.length === 0) {
      return res
        .status(400)
        .json({ message: `No profile with profileId=${id}` });
    }

    await deleteProfileDb(id);

    return res
      .status(200)
      .json({ message: `Profile with id=${id} was deleted successfully` });
  } catch (error) {
    console.error("Error deleting profile: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
