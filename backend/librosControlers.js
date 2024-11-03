import express from "express";
import { db } from "./db.js";
import { query, validationResult } from "express-validator";

export const LibrosCRouter = express.Router();

const validarBusqueda = () => [
  query("q")
    .isAlphanumeric()
    .isLength({ max: 100 })
    .notEmpty()
    .blacklist(`" ' / \ | () {} [] > < = ! `),
];

LibrosCRouter.get("/search", validarBusqueda(), async (req, res) => {
  const validacion = validationResult(req);

  if (!validacion.isEmpty()) {
    return res.status(400).send({ errores: validacion.array() });
  }

  const q = req.query.q;
  console.log(q);

  const filtros = [];
  const parametros = [];
  const saludo = [];

  if (!(q != Number)) {
    saludo.push("hola no soy numero");
  }
  console.log(saludo);
  let sql = "select * from libros";

  if (filtros.length > 0) {
    sql += ` where ${filtros.join(" and ")}`;
  }

  /*
  if (q != undefined) {
    filtros.push(`nombre_libro LIKE ?`);
    parametros.push(`%${q}%`);
  }
  */
  console.log(sql);
  const [libroEncontrado] = await db.execute(sql, parametros);
  res.send({ libros: [libroEncontrado] });
});
