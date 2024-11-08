import { db } from "./mysql.js";
import { clientError } from "../red/errors.js";

const watchUsers = async () => {
  const sql = `SELECT * FROM usuarios`;
  const [usuarios] = await db.execute(sql);
  return usuarios;
};

const findUserByEmail = async (email) => {
  const sql = `SELECT * FROM usuarios WHERE email = ?`;
  const [userEmail] = await db.execute(sql);
  return userEmail;
};

const createUser = async ({
  nombre,
  apellido,
  username,
  email,
  contraseña,
  telefono,
  id_direccion,
  id_roles,
}) => {
  const sql = `INSERT INTO usuarios (nombre,
  nombre,
  apellido,
  username,
  email,
  contraseña,
  telefono,
  id_direccion,
  id_roles,) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const [newOne] = await db.execute(sql, [
    nombre,
    apellido,
    username,
    email,
    contraseña,
    telefono,
    id_direccion,
    id_roles,
  ]);
  if (!newOne) {
    throw new clientError("ingreso invalido", 400);
  }
  return newOne;
};

// cambié la forma de exportar por un error en mi local(volver a original)
 const userModel = {
  createUser,
  watchUsers,
  findUserByEmail,
};
export default userModel