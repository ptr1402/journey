import { type Request, type Response } from "express";
import { InsertMealProduct, SelectMealProduct } from "../../database/schema";
import { validMeal, validMealProduct, validProduct } from "../utils/validation";
import {
  createMealProductDb,
  deleteMealProductDb,
  getMealProductByIdDb,
  getMealProductsByMealIdAndProductIdDb,
  getMealProductsByMealIdDb,
  getMealProductsByProductIdDb,
  getMealProductsDb,
  updateMealProductDb,
} from "../../database/queries/food/mealProduct";

export function validateMealProduct(
  mealProductData: InsertMealProduct
): string[] {
  const errors: string[] = [];

  if (mealProductData.quantity) {
    if (
      typeof mealProductData.quantity !== "number" ||
      mealProductData.quantity <= 0
    ) {
      errors.push("Invalid quantity. Quantity must be a positive number.");
    }
  }

  return errors;
}

export async function getMealProducts(req: Request, res: Response) {
  let mealProducts: SelectMealProduct[] = [];
  try {
    const mealId = req.query.mealId as string;
    const productId = req.query.productId as string;

    let meal: number | undefined = undefined;
    let product: number | undefined = undefined;

    if (mealId) {
      meal = parseInt(mealId, 10);

      if (isNaN(meal)) {
        return res.status(400).json({ error: "mealId must be an integer." });
      }

      const errors: string[] = await validMeal(meal);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
    }

    if (productId) {
      product = parseInt(productId, 10);

      if (isNaN(product)) {
        return res.status(400).json({ error: "productId must be an integer." });
      }

      const errors: string[] = await validProduct(product);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
    }

    if (meal && product) {
      mealProducts = await getMealProductsByMealIdAndProductIdDb(meal, product);
    } else if (meal) {
      mealProducts = await getMealProductsByMealIdDb(meal);
    } else if (product) {
      mealProducts = await getMealProductsByProductIdDb(product);
    } else {
      mealProducts = await getMealProductsDb();
    }

    return res.status(200).json(mealProducts);
  } catch (error) {
    console.error("Error fetching mealProducts: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function getMealProductById(req: Request, res: Response) {
  try {
    const mealProductId = parseInt(req.params.mealProductId, 10);

    if (isNaN(mealProductId)) {
      return res.status(400).json({ error: "Invalid mealProductId." });
    }

    const mealProduct: SelectMealProduct[] = await getMealProductByIdDb(
      mealProductId
    );

    if (mealProduct.length === 0) {
      return res.status(400).json({
        error: `Meal product with mealProductId=${mealProductId} not found.`,
      });
    }

    return res.status(200).json(mealProduct[0]);
  } catch (error) {
    console.error("Error fetching mealProduct: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function createMealProduct(req: Request, res: Response) {
  try {
    const mealProductData: InsertMealProduct = req.body;

    const errors = [...validateMealProduct(mealProductData)];

    if (!mealProductData.productId) {
      errors.push("productId is required.");
    } else {
      const productErrors = await validProduct(mealProductData.productId);
      errors.push(...productErrors);
    }

    if (!mealProductData.mealId) {
      errors.push("mealId is required.");
    } else {
      const mealErrors = await validMeal(mealProductData.mealId);
      errors.push(...mealErrors);
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    await createMealProductDb(mealProductData);

    return res
      .status(201)
      .json({ message: "Meal product created successfully." });
  } catch (error) {
    console.error("Error creating meal product: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function updateMealProduct(req: Request, res: Response) {
  try {
    const mealProductId: SelectMealProduct["id"] = parseInt(
      req.params.mealProductId,
      10
    );

    if (isNaN(mealProductId)) {
      return res.status(400).json({ error: "Invalid mealProductId." });
    }

    const existingMealProductErrors: string[] = await validMealProduct(
      mealProductId
    );
    if (existingMealProductErrors.length > 0) {
      return res.status(404).json({ error: existingMealProductErrors });
    }

    const mealProductData: Partial<Omit<SelectMealProduct, "id">> = req.body;
    if (!mealProductData || Object.keys(mealProductData).length === 0) {
      return res.status(201).json({ message: "No data to update" });
    }

    if (mealProductData.mealId) {
      if (!Number.isInteger(mealProductData.mealId)) {
        return res.status(400).json({ error: "mealId must be an integer" });
      }
      const mealErrors = await validMeal(mealProductData.mealId);

      if (mealErrors.length > 0) {
        return res.status(404).json({ error: mealErrors });
      }
    }

    if (mealProductData.productId) {
      if (!Number.isInteger(mealProductData.productId)) {
        return res.status(400).json({ error: "productId must be an integer" });
      }
      const productErrors = await validProduct(mealProductData.productId);

      if (productErrors.length > 0) {
        return res.status(404).json({ error: productErrors });
      }
    }

    const validationErrors = validateMealProduct(
      mealProductData as InsertMealProduct
    );
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    await updateMealProductDb(mealProductId, mealProductData);

    return res
      .status(201)
      .json({ message: "Meal product data updated successfully." });
  } catch (error) {
    console.error("Error updating mealProduct: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function deleteMealProduct(req: Request, res: Response) {
  try {
    const id: SelectMealProduct["id"] = parseInt(req.params.mealProductId, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid mealProductId." });
    }

    const existingMealProductErrors: string[] = await validMealProduct(id);
    if (existingMealProductErrors.length > 0) {
      return res.status(404).json({ error: existingMealProductErrors });
    }

    await deleteMealProductDb(id);

    return res
      .status(200)
      .json({ message: `Product with id=${id} was deleted successfully.` });
  } catch (error) {
    console.error("Error deleting product: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
