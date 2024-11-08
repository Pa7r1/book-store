import { db } from "./mysql.js";
import { ErrorDelCliente } from "../red/errors.js";

const verUsuarios = async () => {
  const sql = `SELECT * FROM usuarios`;
  const [usuarios] = await db.execute(sql);
  return usuarios;
};

const findUserByEmial = async (email) => {
  const sql = `SELECT * FROM usuarios WHERE email = ?`;
  const [userEmail] = await db.execute(sql);
  return userEmail;
};

const crearUsuario = async ({
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

  const [Unuevo] = await db.execute(sql, [
    nombre,
    apellido,
    username,
    email,
    contraseña,
    telefono,
    id_direccion,
    id_roles,
  ]);
  if (!Unuevo) {
    throw new ErrorDelCliente("ingreso invalido", 400);
  }
  return Unuevo;
};

export const UserModel = {
  crearUsuario,
  verUsuarios,
  findUserByEmial,
};
