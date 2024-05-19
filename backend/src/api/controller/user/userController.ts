import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { InsertUser, SelectUser } from "../../database/schema";
import {
  createUserDb,
  deleteUserDb,
  getUserByIdDb,
  getUsersDb,
  updateUserDb,
} from "../../database/queries/user/user";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await getUsersDb();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUserById(req: Request, res: Response) {
  const id: SelectUser["id"] = parseInt(req.params.userId, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid userId." });
  }

  try {
    const result = await getUserByIdDb(id);

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = result[0];
    return res.status(201).json(user);
  } catch (error) {
    console.error(`Error fetching user with id = ${id}`, error);
    return res.json(500).json({ message: "Internal server error" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const user: InsertUser = req.body;

    const errors: string[] = [];

    if (!emailRegex.test(user.email)) {
      errors.push("Invalid email address");
    }

    if (
      !user.username ||
      typeof user.username !== "string" ||
      user.username.length > 32
    ) {
      errors.push("Invalid username");
    }

    if (
      !user.password ||
      typeof user.password !== "string" ||
      user.password.length < 6
    ) {
      errors.push("Invalid password");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: InsertUser = { ...user, password: hashedPassword };

    await createUserDb(newUser);

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id: SelectUser["id"] = parseInt(req.params.userId, 10);

    if (isNaN(id)) {
      return res.status(400).send("Invalid user");
    }

    const data: Partial<Omit<InsertUser, "id">> = req.body;

    const errors: string[] = [];

    if (data.email !== undefined) {
      if (!emailRegex.test(data.email)) {
        errors.push("Invalid email format");
      }
    }

    if (data.password !== undefined) {
      if (typeof data.password !== "string") {
        errors.push("Invalid password");
      } else {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
      }
    }

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    await updateUserDb(id, data);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log("Error updating user: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id: SelectUser["id"] = parseInt(req.params.userId, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await getUserByIdDb(id);

    if (user?.length === 0) {
      return res
        .status(400)
        .json({ message: `User with id=${id} not found to delete.` });
    }

    await deleteUserDb(id);

    return res
      .status(200)
      .json({ message: `User with id=${id} was deleted successfully` });
  } catch (error) {
    console.error("Error deleting user: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
