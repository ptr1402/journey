import { type Request, type Response } from "express";
import { InsertGoal, SelectGoal } from "../../database/schema";
import { validUser } from "../utils/validation";
import {
  createGoalDb,
  deleteGoalDb,
  getGoalByIdDb,
  getGoalByUserIdDb,
  getGoalsDb,
  updateGoalDb,
} from "../../database/queries/user/goal";

function validateGoal(goalData: InsertGoal): string[] {
  const errors: string[] = [];

  if (goalData.dailyKcalGoal) {
    if (
      !Number.isInteger(goalData.dailyKcalGoal) ||
      goalData.dailyKcalGoal <= 0
    ) {
      errors.push("Invalid dailyKcalGoal. It must be a positive integer.");
    }
  }

  if (goalData.dailyProteinGoal) {
    if (
      !Number.isInteger(goalData.dailyProteinGoal) ||
      goalData.dailyProteinGoal <= 0
    ) {
      errors.push("Invalid dailyProteinGoal. It must be a positive integer.");
    }
  }

  if (goalData.dailyCarbsGoal) {
    if (
      !Number.isInteger(goalData.dailyCarbsGoal) ||
      goalData.dailyCarbsGoal <= 0
    ) {
      errors.push("Invalid dailyCarbsGoal. It must be a positive integer.");
    }
  }

  if (goalData.dailyFatsGoal) {
    if (
      !Number.isInteger(goalData.dailyFatsGoal) ||
      goalData.dailyFatsGoal <= 0
    ) {
      errors.push("Invalid dailyFatsGoal. It must be a positive integer.");
    }
  }

  return errors;
}

export async function getGoals(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string;

    if (userId) {
      const user = parseInt(userId, 10);
      if (isNaN(user)) {
        return res.status(400).json({ error: "Invalid userId." });
      }

      const goal: SelectGoal[] = await getGoalByUserIdDb(user);

      if (goal.length === 0) {
        return res
          .status(404)
          .json({ error: `There is no user with userId=${userId}` });
      }

      return res.status(200).json(goal[0]);
    }

    const goals: SelectGoal[] = await getGoalsDb();
    return res.status(200).json(goals);
  } catch (error) {
    console.error("Error fetching goals: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function getGoalById(req: Request, res: Response) {
  try {
    const goalId = parseInt(req.params.goalId, 10);

    if (isNaN(goalId)) {
      return res.status(400).json({ error: "Invalid goalId." });
    }

    const goal: SelectGoal[] = await getGoalByIdDb(goalId);

    if (goal.length === 0) {
      return res.status(404).json({ error: "Goal not found." });
    }

    return res.status(201).json(goal[0]);
  } catch (error) {
    console.error("Error fetching goal:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function createGoal(req: Request, res: Response) {
  try {
    const goalData: InsertGoal = req.body;

    const errors: string[] = await validUser(goalData.userId);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const validationErrors: string[] = validateGoal(goalData);

    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    await createGoalDb(goalData);

    return res.status(201).json({ message: "Goal created successfully." });
  } catch (error) {
    console.error("Error creating goal: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function updateGoal(req: Request, res: Response) {
  try {
    const goalId: SelectGoal["id"] = parseInt(req.params.goalId, 10);

    if (isNaN(goalId)) {
      return res.status(400).json({ error: "Invalid goal ID." });
    }

    const existingGoal = await getGoalByIdDb(goalId);
    if (!existingGoal || existingGoal.length === 0) {
      return res
        .status(404)
        .json({ error: `Goal not found for goalId=${goalId}` });
    }

    const goalData: Partial<Omit<SelectGoal, "id">> = req.body;

    const validationErrors = validateGoal(goalData as InsertGoal);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    await updateGoalDb(goalId, goalData);

    return res.status(200).json({ message: "Goal updated successfully." });
  } catch (error) {
    console.error("Error updating goal:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function deleteGoal(req: Request, res: Response) {
  try {
    const id: SelectGoal["id"] = parseInt(req.params.goalId, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid goalId" });
    }

    const goal = await getGoalByIdDb(id);

    if (goal?.length === 0) {
      return res.status(400).json({ error: `No goal with goalId=${id}` });
    }

    await deleteGoalDb(id);

    return res
      .status(200)
      .json({ message: `Goal with id=${id} was deleted successfully` });
  } catch (error) {
    console.error("Error deleting goal: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
