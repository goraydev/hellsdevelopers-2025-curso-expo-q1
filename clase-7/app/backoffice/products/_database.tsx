import { SQLiteManager } from "expo-sqlite-reactive";
import uuid from "react-native-uuid";

// Lo que se guarda en la DB
export type TypeProductsTableSchema = {
  productUUID: string;
  productName: string;
  productDescription: string;
  productImage?: string;
  brandUUID: string;
  modelUUID: string;
  productPrice: number;
};

export type TypeImageProductsTableScheme = {
  producdUUIDImage: string;
  productImage: string;
  productUUID: string;
};

// Lo que manejas en la app
export type TypeProductsAppSchema = Omit<
  TypeProductsTableSchema,
  "productUUID" | "productImages"
> & {
  productImages?: TypeImageProductsTableScheme[]; // array en la app
};

export const tableName = "products";
export const tableImagesName = "images";

/**
 * Crea la tabla "products" con las columnas especificadas.
 */
export async function createTable() {
  await SQLiteManager.createTable(tableName, {
    productUUID: "TEXT NOT NULL",
    productName: "TEXT",
    productDescription: "TEXT",
    productImage: "TEXT",
    productImages: "TEXT",
    brandUUID: "TEXT",
    modelUUID: "TEXT",
    productPrice: "REAL",
  });
}

export async function createTableImages() {
  await SQLiteManager.createTable(tableImagesName, {
    producdUUIDImage: "TEXT NOT NULL",
    productImage: "TEXT",
    productUUID: "TEXT",
  });
}

/**
 * Elimina (DROP) la tabla "products".
 */
export async function dropTable() {
  await SQLiteManager.dropTable(tableName);
}

export async function dropTableImages() {
  await SQLiteManager.dropTable(tableImagesName);
}

/**
 * Borra todos los registros de la tabla "products".
 */
export async function deleteAllItems() {
  await SQLiteManager.delete(tableName);
}

export async function deleteAllImages() {
  await SQLiteManager.delete(tableImagesName);
}

export async function createEmptyItem(): Promise<string> {
  const newUUID: string = uuid.v4() as string;
  try {
    await SQLiteManager.insert(tableName, {
      productUUID: newUUID,
      productName: "use focus effect",
      productDescription: "",
      brandUUID: "",
      modelUUID: "",
      productPrice: 0,
    });

    return newUUID;
  } catch (error) {
    console.error("Error al crear item vacio:", error);
    return "Error al crear item vacío";
  }
}

/**
 * Inserta un nuevo producto. Genera un `productUUID` automáticamente.
 * @param productData Datos del producto (sin incluir `productUUID`)
 * @returns El `productUUID` generado
 */
export async function insertItem(productData: TypeProductsAppSchema) {
  try {
    const newUUID = uuid.v4() as string;

    await SQLiteManager.insert(tableName, {
      productUUID: newUUID,
      ...productData,
    } as TypeProductsTableSchema);

    if (productData.productImages && productData.productImages.length > 0) {
      await Promise.all(
        productData.productImages.map(async (image) => {
          const newUUIDImage = uuid.v4() as string;

          const dataImage: TypeImageProductsTableScheme = {
            producdUUIDImage: newUUIDImage,
            productImage: image.productImage,
            productUUID: newUUID,
          };

          await insertImageItem(dataImage);
          return newUUIDImage;
        })
      );
    }

    return newUUID;
  } catch (error) {
    console.error("Error al insert el producto", error);
  }
}

export async function insertImageItem(imageData: TypeImageProductsTableScheme) {
  try {
    await SQLiteManager.insert(tableImagesName, imageData);
  } catch (error) {
    console.error("Error al insert el producto", error);
  }
}

export async function insertAllImages(
  images: TypeImageProductsTableScheme[],
  productUUID: string
) {
  try {
    await Promise.all(
      images.map(async (image) => {
        const newUUIDImage = uuid.v4() as string;

        const dataImage: TypeImageProductsTableScheme = {
          producdUUIDImage: newUUIDImage,
          productImage: image.productImage,
          productUUID,
        };

        await insertImageItem(dataImage);
        return newUUIDImage;
      })
    );
  } catch (error) {
    console.error("Error al insert el producto", error);
  }
}

/**
 * Busca productos en la tabla "products" con filtros y orden opcionales.
 * @param filters Filtros a aplicar
 * @param sort Orden de los resultados (por defecto ordena por `productName` ascendente)
 */
export async function searchItems(
  filters: Partial<TypeProductsTableSchema> = {},
  sort: Record<string, 1 | -1> = { productName: 1 }
): Promise<TypeProductsTableSchema[]> {
  try {
    const rows = await SQLiteManager.select<TypeProductsTableSchema>(
      tableName,
      ["*"],
      filters,
      sort
    );
    return rows || [];
  } catch (err) {
    console.info("Error searchItems: ", err);
    return [];
  }
}
export async function searchItemsGallery(
  productUUID: string
): Promise<TypeImageProductsTableScheme[]> {
  try {
    const rows = await SQLiteManager.select<TypeImageProductsTableScheme>(
      tableImagesName,
      ["*"],
      { productUUID }
    );
    return rows || [];
  } catch (err) {
    console.info("Error searchItems: ", err);
    return [];
  }
}

/**
 * Retorna la cantidad de productos existentes en la tabla.
 */
export async function countItems(): Promise<number> {
  try {
    const rows = await SQLiteManager.select<TypeProductsTableSchema>(
      tableName,
      ["*"],
      {}
    );
    return rows?.length || 0;
  } catch (err) {
    console.info("Error countItems: ", err);
    return 0;
  }
}

/**
 * Actualiza un producto usando como clave el `productUUID`.
 * @param productUUID UUID del producto a actualizar
 * @param items Campos que se desean actualizar
 */
export async function updateEntity(
  productUUID: string,
  items: Partial<TypeProductsTableSchema>
) {
  try {
    await SQLiteManager.update(tableName, { productUUID }, items);
  } catch (err) {
    console.info("Error updateEntity: ", err);
  }
}

/**
 * Inserta o actualiza un producto (upsert) según exista o no el `productUUID`.
 * @param row Objeto de producto que se desea insertar/actualizar
 */
export async function upsertEntity(row: TypeProductsTableSchema) {
  try {
    const existingRow = await SQLiteManager.select<TypeProductsTableSchema>(
      tableName,
      ["*"],
      { productUUID: row.productUUID }
    );

    if (existingRow && existingRow.length > 0) {
      await SQLiteManager.update(
        tableName,
        { productUUID: row.productUUID },
        row
      );
      console.info(`Registro con UUID ${row.productUUID} actualizado.`);
    } else {
      await SQLiteManager.insert(tableName, row);
      console.info(`Registro con UUID ${row.productUUID} insertado.`);
    }
  } catch (err) {
    console.error("Error en upsertEntity:", err);
    throw err;
  }
}

/**
 * Elimina un producto de la tabla usando el `productUUID`.
 * @param productUUID UUID del producto a eliminar
 */
export async function deleteEntity(productUUID: string) {
  try {
    await SQLiteManager.delete(tableName, { productUUID });
  } catch (err) {
    console.info("Error deleteEntity: ", err);
  }
}

export async function deleteImageEntity(imageUUID: string) {
  try {
    await SQLiteManager.delete(tableImagesName, {
      producdUUIDImage: imageUUID,
    });
  } catch (err) {
    console.info("Error deleteEntity: ", err);
  }
}

function parseImages(images?: string): string[] {
  if (!images) return [];
  try {
    const parsed = JSON.parse(images);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Obtiene un producto de la tabla usando el `productUUID`.
 * @param productUUID UUID del producto
 */
export async function getEntityByUUID(productUUID: string) {
  try {
    const result = await SQLiteManager.select<TypeProductsTableSchema>(
      tableName,
      ["*"],
      {
        productUUID,
      }
    );

    const product = result?.[0];
    if (!product) return null;
    const images = await SQLiteManager.select<TypeImageProductsTableScheme>(
      tableImagesName,
      ["*"],
      { productUUID }
    );

    if (!images?.length) return null;

    return {
      ...product,
      productImages: images,
    };
  } catch (error) {
    console.error("Error al obtener producto por UUID:", error);
    return null;
  }
}

/**
 * Export default (opcional). Solo para que exista un punto de entrada.
 */
export default function _database() {
  return null;
}
