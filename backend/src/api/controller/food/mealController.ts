import { type Request, type Response } from "express";
import { InsertMeal, SelectMeal } from "../../database/schema";
import { validMeal, validUser } from "../utils/validation";
import {
  createMealDb,
  deleteMealDb,
  getMealByIdDb,
  getMealsDb,
  getMealsForUserDb,
  getMealsForUserFromStartDateDb,
  getMealsForUserFromStartDateUntilEndDateDb,
  getMealsForUserUntilEndDateDb,
  updateMealDb,
} from "../../database/queries/food/meal";

function validateMeal(meal: InsertMeal): string[] {
  const errors: string[] = [];

  if (meal.name) {
    if (typeof meal.name !== "string" || meal.name.length > 32) {
      errors.push("Invalid name");
    }
  }

  return errors;
}

export async function getMeals(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string;
    const startDateParam = req.query.startDate as string;
    const endDateParam = req.query.endDate as string;

    const user = userId ? parseInt(userId, 10) : undefined;
    const startDate = startDateParam ? new Date(startDateParam) : undefined;
    const endDate = endDateParam ? new Date(endDateParam) : undefined;

    let meals: SelectMeal[];

    if (user) {
      if (startDate && endDate) {
        meals = await getMealsForUserFromStartDateUntilEndDateDb(
          user,
          startDate,
          endDate
        );
      } else if (startDate) {
        meals = await getMealsForUserFromStartDateDb(user, startDate);
      } else if (endDate) {
        meals = await getMealsForUserUntilEndDateDb(user, endDate);
      } else {
        meals = await getMealsForUserDb(user);
      }
    } else {
      meals = await getMealsDb();
    }

    return res.status(200).json(meals);
  } catch (error) {
    console.error("Error fetching meals: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function createMeal(req: Request, res: Response) {
  try {
    const meal: InsertMeal = req.body;

    const errors: string[] = await validUser(meal.userId);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const validationErrors: string[] = validateMeal(meal);
    if (validationErrors.length > 0) {
      return res.status(400).json({ validationErrors });
    }

    await createMealDb(meal);

    return res.status(201).json({ message: "Meal created successfully." });
  } catch (error) {
    console.error("Error creating meal: ", error);
    return res.status(500).json({ message: `Internal server error.` });
  }
}

export async function getMealById(req: Request, res: Response) {
  const id: SelectMeal["id"] = parseInt(req.params.mealId, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid mealId" });
  }

  try {
    const result = await getMealByIdDb(id);

    if (result.length === 0) {
      return res.status(404).json({ error: "Meal not found." });
    }

    const meal = result[0];
    return res.status(201).json(meal);
  } catch (error) {
    console.error(`Error fetching meal with id=${id}`);
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function updateMeal(req: Request, res: Response) {
  try {
    const mealId: SelectMeal["id"] = parseInt(req.params.mealId, 10);

    if (isNaN(mealId)) {
      return res.status(400).json({ error: "Invalid meal ID." });
    }

    const existingMealErrors: string[] = await validMeal(mealId);
    if (existingMealErrors.length > 0) {
      return res.status(404).json({ error: existingMealErrors });
    }

    const data: Partial<Omit<SelectMeal, "id">> = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(201).json({ message: "No data to update" });
    }

    const validationErrors = validateMeal(data as InsertMeal);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors });
    }

    await updateMealDb(mealId, data);

    return res.status(200).json({ message: "Meal updated successfully." });
  } catch (error) {
    console.error("Error updating meal: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function deleteMeal(req: Request, res: Response) {
  try {
    const id: SelectMeal["id"] = parseInt(req.params.mealId, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid mealId." });
    }

    const existingMealErrors: string[] = await validMeal(id);
    if (existingMealErrors.length > 0) {
      return res.status(404).json({ error: existingMealErrors });
    }

    await deleteMealDb(id);

    return res
      .status(200)
      .json({ message: `Goal with id=${id} was deleted successfully.` });
  } catch (error) {
    console.error("Error deleting meal: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
