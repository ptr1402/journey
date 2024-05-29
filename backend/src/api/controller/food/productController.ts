import { type Request, type Response } from "express";
import { InsertProduct, SelectProduct } from "../../database/schema";
import {
  createProductDb,
  deleteProductDb,
  getProductByIdDb,
  getProductsByNameDb,
  getProductsDb,
  updateProductDb,
} from "../../database/queries/food/product";
import { validProduct } from "../utils/validation";

function validateProduct(product: InsertProduct): string[] {
  const errors: string[] = [];

  if (
    product.name !== undefined &&
    (typeof product.name !== "string" || product.name.length > 32)
  ) {
    errors.push("Invalid name");
  }

  if (
    product.kcalPerPortion !== undefined &&
    (typeof product.kcalPerPortion !== "number" || product.kcalPerPortion < 0)
  ) {
    errors.push("Invalid calories");
  }

  if (
    product.protPerPortion !== undefined &&
    (typeof product.protPerPortion !== "number" || product.protPerPortion < 0)
  ) {
    errors.push("Invalid proteins");
  }

  if (
    product.carbPerPortion !== undefined &&
    (typeof product.carbPerPortion !== "number" || product.carbPerPortion < 0)
  ) {
    errors.push("Invalid carbs");
  }

  if (
    product.fatPerPortion !== undefined &&
    (typeof product.fatPerPortion !== "number" || product.fatPerPortion < 0)
  ) {
    errors.push("Invalid fats");
  }

  return errors;
}

export async function getProducts(req: Request, res: Response) {
  try {
    let products: SelectProduct[];
    const name: string = req.query.name as string;

    if (name) {
      const searchName: string = "%" + name + "%";
      products = await getProductsByNameDb(searchName);
    } else {
      products = await getProductsDb();
    }
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getProductById(req: Request, res: Response) {
  const id: SelectProduct["id"] = parseInt(req.params.productId, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid productId." });
  }

  try {
    const result = await getProductByIdDb(id);

    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = result[0];
    return res.status(201).json(product);
  } catch (error) {
    console.error(`Error fetching product with id= ${id}`, error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const product: InsertProduct = req.body;

    if (
      !product ||
      !product.name ||
      !product.kcalPerPortion ||
      !product.protPerPortion ||
      !product.carbPerPortion ||
      !product.fatPerPortion
    ) {
      return res
        .status(400)
        .json({ error: "Name, kcal, prot, carbs, fats are mandatory." });
    }

    const errors: string[] = validateProduct(product);

    if (errors.length > 0) {
      return res.status(400).json({ error: errors });
    }

    await createProductDb(product);

    return res.status(201).json({ message: "Product created successfully." });
  } catch (error) {
    console.error("Error creating product: ", error);
    return res.status(500).json({ error: `Internal server error.` });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id: SelectProduct["id"] = parseInt(req.params.productId, 10);
    if (isNaN(id)) {
      return res.status(400).send("Invalid productId");
    }

    const existingProductErrors: string[] = await validProduct(id);
    if (existingProductErrors.length > 0) {
      return res.status(404).json({ error: existingProductErrors });
    }

    const data: Partial<Omit<SelectProduct, "id">> = req.body;
    const validationErrors: string[] = validateProduct(data as InsertProduct);

    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors });
    }

    await updateProductDb(id, data);

    return res.status(200).send("Product updated successfully");
  } catch (error) {
    console.error("Error updating product: ", error);
    return res.status(500).send("Internal server error");
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id: SelectProduct["id"] = parseInt(req.params.productId, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid productId" });
    }

    const existingProductErrors: string[] = await validProduct(id);
    if (existingProductErrors.length > 0) {
      return res.status(404).json({ error: existingProductErrors });
    }

    await deleteProductDb(id);

    return res
      .status(200)
      .json({ message: `Product with id=${id} was deleted successfully` });
  } catch (error) {
    console.error("Error deleting product: ", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
