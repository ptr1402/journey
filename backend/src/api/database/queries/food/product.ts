import { eq, ilike } from "drizzle-orm";
import { db } from "../../config/databaseConfig";
import { InsertProduct, SelectProduct, productsTable } from "../../schema";

export async function getProductsDb(): Promise<SelectProduct[]> {
  return db.select().from(productsTable);
}

export async function getProductByIdDb(
  id: SelectProduct["id"]
): Promise<SelectProduct[]> {
  return db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, id))
    .limit(1);
}

export async function getProductsByNameDb(
  name: string
): Promise<SelectProduct[]> {
  return db
    .select()
    .from(productsTable)
    .where(ilike(productsTable.name, name))
    .limit(5);
}

export async function createProductDb(product: InsertProduct) {
  await db.insert(productsTable).values(product);
}

export async function updateProductDb(
  id: SelectProduct["id"],
  data: Partial<Omit<SelectProduct, "id">>
) {
  data.updatedAt = new Date();
  await db.update(productsTable).set(data).where(eq(productsTable.id, id));
}

export async function deleteProductDb(id: SelectProduct["id"]) {
  await db.delete(productsTable).where(eq(productsTable.id, id));
}
