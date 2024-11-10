import { db } from "./mysql.js";
import { clientError } from "../red/errors.js";

const allUser = async () => {
  const sql = `SELECT * FROM usuarios`;
  const { rows } = await db.execute(sql);
  return rows;
};

const findOneByUID = async (id) => {
  const sql = `SELECT * FROM usuarios WHERE id_usuario = ?`;
  const { rows } = await db.execute(sql, [id]);
  return rows[0];
};

const findUserByEmail = async (email) => {
  const sql = `SELECT * FROM usuarios WHERE email = ?`;
  const [rows] = await db.execute(sql, email);
  return rows[0];
};

const createUser = async ({
  nombre,
  apellido,
  username,
  email,
  contraseña,
  telefono,
  id_direccion,
}) => {
  const sql = `INSERT INTO usuarios (nombre,
  nombre,
  apellido,
  username,
  email,
  contraseña,
  telefono,
  id_direccion,
  id_roles,) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const { rows } = await db.execute(sql, [
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
  return rows[0];
};

// cambié la forma de exportar por un error en mi local(volver a original)
const userModel = {
  createUser,
  allUser,
  findUserByEmail,
  findOneByUID,
};
export default userModel;
