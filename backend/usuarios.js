import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

export const usuarioRouter = express.Router();

const validarUsuario = () => [
  body("nombre").isAlpha().notEmpty().isLength({ max: 100 }),
  body("username").isAlphanumeric().notEmpty().isLength({ max: 25 }),
  body("apellido").isAlpha().notEmpty().isLength({ max: 100 }),
  body("contraseña").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0,
  }),
  body("email").isEmail().notEmpty().isLength({ max: 100 }),
  body("tipo_usuario").isAlpha().notEmpty().isLength({ max: 9 }),
  body("direccion").notEmpty().isLength({ max: 150 }),
  body("telefono").isAlphanumeric().notEmpty().isLength({ max: 15 }),
];
usuarioRouter.get("/", async (req, res) => {
  const [usuarios] = await db.execute("select * from usuarios");
  res.send({ usuarios });
});

usuarioRouter.post("/", validarUsuario, async (req, res) => {
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

  const [result] = await db.execute(
    "insert into usuarios (nombre, apellido, username, email, contraseña, tipo_usuario, direccion, telefono) values (?,?,?,?,?,?,?,?)",
    [
      nombre,
      apellido,
      username,
      email,
      contraseñaHashed,
      tipo_usuario,
      direccion,
      telefono,
    ]
  );
  res.status(201).send({ usuario: { id: result.insertId, username } });
});

/*
{
      "id_usuario": 1,
      "nombre": "pedrito",
      "apellido": "abeja",
      "username": "pedritoloco1",
      "email": "pedritoloco@gmail.com",
      "contraseña": "pedrito123",
      "tipo_usuario": "empleado",
      "direccion": "la rioja",
      "telefono": "3247190238"
    }
*/
