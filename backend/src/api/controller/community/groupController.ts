import { type Request, type Response } from "express";
import { InsertGroup, SelectGroup } from "../../database/schema";
import { validGroup, validUser } from "../utils/validation";
import {
  createGroupDb,
  deleteGroupDb,
  getGroupByIdDb,
  getGroupsByManagerIdDb,
  getGroupsByNameDb,
  getGroupsByUserIdDb,
  getGroupsDb,
  updateGroupDb,
} from "../../database/queries/community/group";

export function validateGroup(groupData: InsertGroup): string[] {
  const errors: string[] = [];

  if (
    groupData.name &&
    (typeof groupData.name !== "string" || groupData.name.length > 64)
  ) {
    errors.push("Invalid group name.");
  }

  if (groupData.description && typeof groupData.description !== "string") {
    errors.push("Invalid group description.");
  }

  return errors;
}

export async function getGroups(req: Request, res: Response) {
  try {
    const userId: string | undefined = req.query.userId as string;
    const managerId: string | undefined = req.query.manager as string;
    const name: string | undefined = req.query.name as string;

    let groups: SelectGroup[];

    if (userId) {
      const user = parseInt(userId, 10);
      if (isNaN(user)) {
        return res.status(400).json({ error: "Invalid userId." });
      }

      const existingUserErrors: string[] = await validUser(user);
      if (existingUserErrors.length > 0) {
        return res.status(404).json({ error: existingUserErrors });
      }

      groups = await getGroupsByUserIdDb(user);
    } else if (managerId) {
      const manager = parseInt(managerId, 10);
      if (isNaN(manager)) {
        return res.status(400).json({ error: "Invalid manager." });
      }

      const existingManagerErrors: string[] = await validUser(manager);
      if (existingManagerErrors.length > 0) {
        return res.status(404).json({ error: existingManagerErrors });
      }

      groups = await getGroupsByManagerIdDb(manager);
    } else if (name) {
      const searchName: string = "%" + name + "%";
      groups = await getGroupsByNameDb(searchName);
    } else {
      groups = await getGroupsDb();
    }

    return res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching groups: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function getGroupById(req: Request, res: Response) {
  const id: SelectGroup["id"] = parseInt(req.params.groupId, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid groupId." });
  }

  try {
    const group = await getGroupByIdDb(id);

    if (group.length === 0) {
      return res.status(404).json({ error: "No groups found." });
    }

    return res.status(200).json(group[0]);
  } catch (error) {
    console.error(`Error fetching product with id=${id}`, error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function createGroup(req: Request, res: Response) {
  try {
    const group: InsertGroup = req.body;

    if (!group.name || !group.manager) {
      return res.status(400).json({
        error: "All field are required: name, manager",
      });
    }

    if (isNaN(group.manager)) {
      return res.status(400).json({ error: "Invalid manager id." });
    }

    const existingManagerErrors: string[] = await validUser(group.manager);
    if (existingManagerErrors.length > 0) {
      return res.status(404).json({ error: "Invalid manager provided." });
    }

    const validationErrors: string[] = validateGroup(group);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors });
    }

    await createGroupDb(group);

    return res.status(201).json({ message: "Group created successfully." });
  } catch (error) {
    console.error("Error creating group: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function updateGroup(req: Request, res: Response) {
  try {
    const id: SelectGroup["id"] = parseInt(req.params.groupId, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid groupId." });
    }

    const existingGroupErrors: string[] = await validGroup(id);
    if (existingGroupErrors.length > 0) {
      return res.status(400).json({ error: existingGroupErrors });
    }

    const data: Partial<Omit<SelectGroup, "id">> = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(201).json({ message: "No data to update." });
    }

    const validationErrors: string[] = validateGroup(data as InsertGroup);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors });
    }

    await updateGroupDb(id, data);

    return res.status(201).json({ message: "Group updated successfully." });
  } catch (error) {
    console.error("Error updating group: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteGroup(req: Request, res: Response) {
  try {
    const id: SelectGroup["id"] = parseInt(req.params.groupId, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid groupId." });
    }

    const existingGroupErrors: string[] = await validGroup(id);
    if (existingGroupErrors.length > 0) {
      return res.status(404).json({ error: existingGroupErrors });
    }

    await deleteGroupDb(id);

    return res
      .status(200)
      .json({ message: `Group with id=${id} was deleted successfully.` });
  } catch (error) {
    console.error("Error deleting product: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
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
