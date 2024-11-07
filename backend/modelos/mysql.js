import mysql from "mysql2/promise";
import configDatabase from "../config.js";

const configDB = {
  host: configDatabase.mysql.host,
  user: configDatabase.mysql.user,
  password: configDatabase.mysql.password,
  database: configDatabase.mysql.database,
};

export let db;

export async function conectarDB() {
  try {
    db = await mysql.createConnection(configDB);
    console.log("Conexión a la base de datos establecida.");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
  }
}

conectarDB();
