import { SQLiteManager } from "expo-sqlite-reactive";

export type User = {
  user_id?: number;
  user_name: string;
  user_email: string;
  user_password: string;
  user_level: number;
};

export const tableName = "users";

export async function createTable() {
  try {
    await SQLiteManager.createTable(tableName, {
      user_id: "integer primary key autoincrement",
      user_name: "text not null",
      user_email: "text not null",
      user_password: "text not null",
      user_level: "integer",
    });
    console.log("Tabla users creada con éxito");
  } catch (error) {
    console.error("Error al crear la tabla", error);
  }
}

export async function existsFirstOrCreate() {
  const exists = await SQLiteManager.select<User>(tableName, ["*"], {});
  if (!exists || exists.length === 0) {
    await insertItemUser({
      user_id: 1,
      user_name: "admin",
      user_email: "admin@gmail.com",
      user_password: "admin1234",
      user_level: 1,
    });
  }
}

export async function countItems(): Promise<number> {
  try {
    const rows = await SQLiteManager.select<User>(
      tableName,
      ["*"],
      {},
      undefined
    );

    if (!rows) return 0;
    return rows.length;
  } catch (error) {
    console.error("Error al contar los elementos", error);
    return 0;
  }
}

export async function updateEntity(userUUID: string, items: Partial<User>) {
  try {
    await SQLiteManager.update(tableName, items, { user_id: userUUID });
    console.log("Elemento actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el elemento", error);
  }
}
export async function deleteAllUsers() {
  try {
    await SQLiteManager.delete(tableName, {});
    console.log("Todos los elementos eliminados con éxito");
  } catch (error) {
    console.error("Error al eliminar todos los elementos", error);
  }
}

export async function insertItemUser(user: User) {
  try {
    await SQLiteManager.insert(tableName, user);
    console.log("usuario creado con éxito");
  } catch (error) {
    console.error("Error al insertar el elemento", error);
  }
}

export async function getEntityById(userUUID: string) {
  try {
    const result = await SQLiteManager.select(tableName, ["*"], { userUUID });
    return result?.[0] || null;
  } catch (error) {
    console.error("Erroe al obtener el usuario por", error);
    return null;
  }
}

export async function getEntityByEmail(userEmail: string) {
  try {
    const result = await SQLiteManager.select<User>(tableName, ["*"], {
      user_email: userEmail,
    });
    return result?.[0] || null;
  } catch (error) {
    console.error("Error al obtener el usuario por email", error);
    return null;
  }
}

export async function checkUserAndPassword(
  userEmail: string,
  userPassword: string
) {
  const user = await getEntityByEmail(userEmail);
  if (!user) return false;

  return user?.user_password === userPassword;
}

export async function droptTable() {
  await SQLiteManager.dropTable(tableName);
}

export default async function _database() {
  return null;
}
