import { type Request, type Response } from "express";
import {
  InsertGroup,
  InsertUser,
  SelectGroup,
  SelectUser,
} from "../../database/schema";
import { validGroup, validUser } from "../utils/validation";
import {
  addUserToGroupDb,
  createGroupDb,
  deleteGroupDb,
  getGroupByIdDb,
  getGroupsByManagerIdDb,
  getGroupsByNameDb,
  getGroupsByUserIdDb,
  getGroupsDb,
  getUsersFromGroupDb,
  removeUserFromGroupDb,
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

    if (data.manager) {
      if (!Number.isInteger(data.manager)) {
        return res
          .status(400)
          .json({ error: "The manager id has to be an integer." });
      }

      const existingUserErrors: string[] = await validUser(data.manager);
      if (existingUserErrors.length > 0) {
        return res.status(404).json({ error: existingUserErrors });
      }

      const currentUsers: SelectUser[] = await getUsersFromGroupDb(id);
      if (currentUsers.findIndex((user) => user.id === data.manager) === -1) {
        return res.status(404).json({
          error: `User with userId=${data.manager} is not part of this group.`,
        });
      }
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
  const id: SelectGroup["id"] = parseInt(req.params.groupId, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid groupId." });
  }

  const existingGroupErrors: string[] = await validGroup(id);
  if (existingGroupErrors.length > 0) {
    return res.status(404).json({ error: existingGroupErrors });
  }

  try {
    const usersFromGroup = await getUsersFromGroupDb(id);
    return res.status(200).json(usersFromGroup);
  } catch (error) {
    console.error(`Error fetching group with id=${id}`, error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function addUserToGroup(req: Request, res: Response) {
  const groupId: SelectGroup["id"] = parseInt(req.params.groupId);
  const userId: InsertUser["id"] = req.body.userId;

  if (isNaN(groupId)) {
    return res.status(400).json({ error: "Invalid groupId." });
  }

  const existingGroupErrors: string[] = await validGroup(groupId);
  if (existingGroupErrors.length > 0) {
    return res.status(404).json({ error: existingGroupErrors });
  }

  if (!userId) {
    return res.status(400).json({ error: "No user provided." });
  }

  if (!Number.isInteger(userId)) {
    return res.status(400).json({ error: "The userId has to be an integer." });
  }

  const existingUserErrors: string[] = await validUser(userId);
  if (existingUserErrors.length > 0) {
    return res.status(404).json({ error: existingUserErrors });
  }

  try {
    await addUserToGroupDb(userId, groupId);
    return res
      .status(201)
      .json({ message: "User added to group successfully." });
  } catch (error) {
    console.error(
      `Error adding user with id=${userId} to group with groupId=${groupId}`,
      error
    );
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function deleteUserFromGroup(req: Request, res: Response) {
  const groupId: SelectGroup["id"] = parseInt(req.params.groupId, 10);
  const userId: SelectUser["id"] = req.body.userId;

  if (isNaN(groupId)) {
    return res.status(400).json({ error: "Invalid groupId." });
  }

  const existingGroupErrors: string[] = await validGroup(groupId);
  if (existingGroupErrors.length > 0) {
    return res.status(404).json({ error: existingGroupErrors });
  }

  if (!Number.isInteger(userId)) {
    return res.status(400).json({ error: "The userId has to be an integer." });
  }

  const existingUserErrors: string[] = await validUser(userId);
  if (existingUserErrors.length > 0) {
    return res.status(404).json({ error: existingUserErrors });
  }

  const usersFromGroup: SelectUser[] = await getUsersFromGroupDb(groupId);
  if (usersFromGroup.findIndex((user) => user.id === userId) === -1) {
    return res.status(404).json({
      error: `User with userId=${userId} is not part of this group.`,
    });
  }

  try {
    await removeUserFromGroupDb(userId, groupId);
    return res.status(200).json({ message: "User removed from group." });
  } catch (error) {
    console.error(
      `Error deleting user with id=${userId} from group with groupId=${groupId}`,
      error
    );
    return res.status(500).json({ error: "Internal server error." });
  }
}
