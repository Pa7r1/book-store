import express from "express";
import { db } from "./db.js";
import { validationResult } from "express-validator";
import { validarUsuario } from "./middleware.js";
import bcrypt from "bcrypt";

export const usuarioRouter = express.Router();

usuarioRouter.get("/", async (req, res) => {
  const [usuarios] = await db.execute(
    "select nombre, apellido, username from usuarios"
  );
  res.send({ usuarios });
});

usuarioRouter.post("/", validarUsuario(), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    return res.status(400).send({ errores: validacion.array() });
  }
  const {
    nombre,
    apellido,
    username,
    email,
    contraseña,
    tipo_usuario,
    direccion,
    telefono,
  } = req.body;

  const contraseñaHashed = await bcrypt.hash(contraseña, 10);
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
});

usuarioRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await db.execute("delete from usuarios where id_usuario=?", [id]);

  res.send({ id: parseInt(id) });
});
