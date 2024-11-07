import { db } from "./mysql.js";

// archivo destinado a todas las consultas
const crearUsuario = async (
  nombre,
  apellido,
  username,
  email,
  contraseñaHashed,
  tipo_usuario,
  direccion,
  telefono
) => {
  const sql =
    "insert into usuarios (nombre, apellido, username, email, contraseña, tipo_usuario, direccion, telefono) values (?,?,?,?,?,?,?,?)";

  const [result] = await db.execute(sql, [
    nombre,
    apellido,
    username,
    email,
    contraseñaHashed,
    tipo_usuario,
    direccion,
    telefono,
  ]);
  res.status(201).send({ usuario: { id: result.insertId, username } });
};

const buscaPorUsername = async (username) => {
  const sql = `SELECT * FROM usuarios WHERE username = ?`;
  const [result] = await db.execute(sql, username);
};

export const modelUser = {
  crearUsuario,
  buscaPorUsername,
};
