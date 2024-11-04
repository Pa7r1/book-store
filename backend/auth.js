import express from "express";
import { db } from "./db.js";
import { body, validationResult } from "express-validator";
import jtw from "jsonwebtoken";
import bcryp from "bcrypt";

export const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errores: validacion.array });
  }
  const { username, contraseña } = req.body;
  const compareContraseña = await bcryp.compare(
    contraseña,
    usuarios[0].contraseña
  );
  if (!compareContraseña) {
    res.status(400).send({ error: "Usuario o contraseña ivalidos" });
  }
  const sql = "select * from usuarios where username = ?";
  const [usuarios] = await db.execute(sql, username);
  const playload = { username };
  const token = jtw.sign(playload, process.env.JWT_TOKEN, { expiresIn: "2h" });
  res.send({ token });
});
