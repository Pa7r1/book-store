import express from "express";
import { db } from "./db.js";
import { param, query, validationResult } from "express-validator";

export const busquedaRouter = express.Router();

const validarBusqueda = () => [
  query("q")
    .isLength({ max: 100 })
    .notEmpty()
    .blacklist(`" ' / \ | () {} [] > < = ! `),
];

busquedaRouter.get("/search", validarBusqueda(), async (req, res) => {
  const validacion = validationResult(req);

  if (!validacion.isEmpty()) {
    return res.status(400).send({ errores: validacion.array() });
  }

  const q = req.query.q.trim();
  console.log(q);

  const filtros = [];
  const parametros = [];
  if (/^\d+$/.test(q)) {
    filtros.push("isbn = ?");
    parametros.push(q);
  } else {
    filtros.push("titulo LIKE ?");
    parametros.push(`%${q}%`);
  }

  let sql = "SELECT * FROM libros";
  if (filtros.length > 0) {
    sql += ` WHERE ${filtros.join(" AND ")}`;
  }

  console.log(sql);
  const [libroEncontrado] = await db.execute(sql, parametros);
  res.send({ libros: [libroEncontrado] });
});
