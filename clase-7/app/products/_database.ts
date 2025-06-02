import { SQLiteManager } from "expo-sqlite-reactive";

export type Product = {
  productUUID: number;
  productName: string;
  productDescription: string;
  brandUUID: string;
  modelUUID: string;
  productPrice: number;
};

export const tableName = "products";

export async function createTable() {
  try {
    await SQLiteManager.createTable(tableName, {
      productUUID: "integer primary key autoincrement",
      productName: "text not null",
      productDescription: "text",
      brandUUID: "text",
      modelUUID: "text",
      productPrice: "integer",
    });
    console.log("Tabla products creada con éxito");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

export async function deleteAllItems() {
  try {
    await SQLiteManager.delete(tableName, {});
  } catch (error) {
    console.error("Error deleting all items:", error);
  }
}

export async function countItems(): Promise<number> {
  try {
    const rows = await SQLiteManager.select<Product>(
      tableName,
      ["*"],
      {},
      undefined
    );

    if (!rows) return 0;
    return rows.length;
  } catch (error) {
    console.error("Error al contar los productos", error);
    return 0;
  }
}

export async function updateItemProduct(
  productUUID: number,
  items: Partial<Product>
) {
  try {
    await SQLiteManager.update(tableName, items, { productUUID: productUUID });
    console.log("Elemento actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el elemento", error);
  }
}

export async function insertItemProduct(product: Product) {
  try {
    await SQLiteManager.insert(tableName, product);
  } catch (error) {
    console.error("Error inserting item:", error);
  }
}

export default async function _database() {
  return null;
}
