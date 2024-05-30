import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { InsertUser, SelectUser } from "../../database/schema";
import {
  createUserDb,
  deleteUserDb,
  getUserByEmailDb,
  getUserByIdDb,
  getUserByUsernameDb,
  getUsersDb,
  updateUserDb,
} from "../../database/queries/user/user";
import { validUser } from "../utils/validation";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function validateUser(userData: InsertUser): Promise<string[]> {
  const errors: string[] = [];

  if (userData.email) {
    if (!emailRegex.test(userData.email)) {
      errors.push("Invalid email address");
    } else {
      const existingEmail = await getUserByEmailDb(userData.email);
      if (existingEmail && existingEmail.length > 0) {
        errors.push(
          "There is already someone registered with this email address."
        );
      }
    }
  }

  if (userData.username) {
    if (
      typeof userData.username !== "string" ||
      userData.username.length > 32
    ) {
      errors.push("Invalid username");
    } else {
      const existingUsername = await getUserByUsernameDb(userData.username);
      if (existingUsername && existingUsername.length > 0) {
        errors.push("There is already someone registered with this username.");
      }
    }
  }

  if (userData.password) {
    if (typeof userData.password !== "string" || userData.password.length < 6) {
      errors.push("Invalid password");
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
    }
  }

  return errors;
}

export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await getUsersDb();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getUserById(req: Request, res: Response) {
  const id: SelectUser["id"] = parseInt(req.params.userId, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: `Invalid userId=${id}` });
  }

  try {
    const result = await getUserByIdDb(id);

    if (result.length === 0) {
      return res.status(404).json({ error: `User not found with id=${id}` });
    }

    const user = result[0];
    return res.status(200).json(user);
  } catch (error) {
    console.error(`Error fetching user with id = ${id}`, error);
    return res.json(500).json({ error: "Internal server error" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const user: InsertUser = req.body;

    if (!user.email || !user.username || !user.password) {
      return res.status(400).json({
        error: "All fields are required: email, username and password.",
      });
    }

    const errors: string[] = await validateUser(user);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    await createUserDb(user);

    return res.status(201).json({
      message: `User created successfully`,
    });
  } catch (error) {
    console.error("Error creating user: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id: SelectUser["id"] = parseInt(req.params.userId, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid user id provided." });
    }

    const existingUserErrors: string[] = await validUser(id);
    if (existingUserErrors.length > 0) {
      return res.status(404).json({ error: existingUserErrors });
    }

    const data: Partial<Omit<InsertUser, "id">> = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(201).json({ message: "No data to update" });
    }

    const errors: string[] = await validateUser(data as InsertUser);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors });
    }

    await updateUserDb(id, data);

    return res.status(201).json({ message: "User updated successfully" });
  } catch (error) {
    console.log("Error updating user: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id: SelectUser["id"] = parseInt(req.params.userId, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const existingUserErrors: string[] = await validUser(id);
    if (existingUserErrors.length > 0) {
      return res.status(404).json({ error: existingUserErrors });
    }

    await deleteUserDb(id);

    return res
      .status(200)
      .json({ message: `User with id=${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting user: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
