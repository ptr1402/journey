import { type Request, type Response } from "express";
import { InsertProduct, SelectProduct } from "../../database/schema";
import {
  createProductDb,
  deleteProductDb,
  getProductByIdDb,
  getProductsDb,
  updateProductDb,
} from "../../database/queries/food/product";

export async function getProducts(_req: Request, res: Response) {
  try {
    const products: SelectProduct[] = await getProductsDb();
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
    return res.json(500).json({ message: "Internal server error" });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const product: InsertProduct = req.body;

    const errors: string[] = [];

    if (
      !product?.name ||
      typeof product.name !== "string" ||
      product.name.length > 32
    ) {
      errors.push("Invalid name");
    }

    if (
      !product?.kcalPerPortion ||
      typeof product.kcalPerPortion !== "number" ||
      product.kcalPerPortion < 0
    ) {
      errors.push("Invalid calories");
    }

    if (
      !product?.protPerPortion ||
      typeof product.protPerPortion !== "number" ||
      product.protPerPortion < 0
    ) {
      errors.push("Invalid proteins");
    }

    if (
      !product?.carbPerPortion ||
      typeof product.carbPerPortion !== "number" ||
      product.carbPerPortion < 0
    ) {
      errors.push("Invalid carbs");
    }

    if (
      !product?.fatPerPortion ||
      typeof product.fatPerPortion !== "number" ||
      product.fatPerPortion < 0
    ) {
      errors.push("Invalid fats");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    await createProductDb(product);

    return res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product: ", error);
    return res
      .status(400)
      .json({ message: `Error creating product: ${error}` });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id: SelectProduct["id"] = parseInt(req.params.productId, 10);
    const errors: string[] = [];

    if (isNaN(id)) {
      return res.status(400).send("Invalid productId");
    }

    const data: Partial<Omit<SelectProduct, "id">> = req.body;

    if (data.name !== undefined && typeof data.name !== "string") {
      errors.push("Invalid name");
    }

    if (
      data.kcalPerPortion !== undefined &&
      typeof data.kcalPerPortion !== "number"
    ) {
      errors.push("Invalid kcal per portion");
    }

    if (
      data.protPerPortion !== undefined &&
      typeof data.protPerPortion !== "number"
    ) {
      errors.push("Invalid protein per portion");
    }

    if (
      data.carbPerPortion !== undefined &&
      typeof data.carbPerPortion !== "number"
    ) {
      errors.push("Invalid carbs per portion");
    }

    if (
      data.fatPerPortion !== undefined &&
      typeof data.fatPerPortion !== "number"
    ) {
      errors.push("Invalid fat per portion");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
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
      return res.status(400).json({ message: "Invalid productId" });
    }

    const product = await getProductByIdDb(id);

    if (product?.length === 0) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    await deleteProductDb(id);

    return res
      .status(200)
      .json({ message: `Product with id=${id} was deleted successfully` });
  } catch (error) {
    console.error("Error deleting product: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
