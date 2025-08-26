import { SQLiteManager } from "expo-sqlite-reactive";
import {
  createTable as createTableBoot,
  deleteAllItems,
  insertBootItem,
} from "@/app/boot/_database";
import { initiDB as initUserData } from "@/app/users/_layout";
import { initLocalStorage } from "./localStorage";
import {
  createTableImages,
  createTable as CreateTableProducts,
} from "@/app/backoffice/products/_database";

export async function initializeDB() {
  SQLiteManager.initialize("stock42-ferrak.db");
  await createTableBoot();
  await deleteAllItems();
  await insertBootItem("remove all logs");
  await initUserData();
  await insertBootItem("init user data");
  await initLocalStorage();
  await CreateTableProducts();
  await insertBootItem("Tabla de productos creada");
  await createTableImages();
  await insertBootItem("Tabla de imágenes creada");
}
