import { SQLiteManager } from "expo-sqlite-reactive";

export type Product = {
  product_id: number;
  product_name: string;
  product_description: string;
  product_base_price: number;
};

export const tableName = "products";

export async function createTable() {
  try {
    await SQLiteManager.createTable(tableName, {
      product_id: "integer primary key autoincrement",
      product_name: "text not null",
      product_description: "text",
      product_base_price: "integer",
    });
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

export async function insertItemProduct(product: Product) {
  try {
  } catch (error) {
    console.error("Error inserting item:", error);
  }
}

export default async function _database() {
  return null;
}
