import express from "express";
import { db } from "./db.js";
import { query, validationResult } from "express-validator";

export const LibrosCRouter = express.Router();

const validarBusqueda = () => [
  query("q")
    .notEmpty()
    .withMessage("parametro vacio")
    .bail()
    .custom((value) => {
      const isISBN = /^[0-9]{9}[0-9Xx]$|^[0-9]{13}$/.test(value);
      if (isISBN) return true;

      return typeof value === "string" && value.trim().length > 0;
    })
    .withMessage("El parámetro debe ser un ISBN válido o un nombre no vacío"),
];

LibrosCRouter.get("/search", validarBusqueda(), async (req, res) => {
  const validacion = validationResult(req);

  if (!validacion.isEmpty()) {
    return res.status(400).send({ errores: validacion.array() });
  }

  const q = req.query.q;

  let sql = "select * from libro";

  const filtros = [];
  const parametros = [];

  if (q == undefined) {
    res.status(400);
  } else if (typeof q == "number") {
    filtros.push(`isbn = ?`);
    parametros.push(q);
  } else if (q.isLength > 1 && typeof q == "string") {
    filtros.push(`nombre_libro like ?`);
    parametros.push(`%${q}%`);
  }
  /*
  if (q != undefined) {
    filtros.push(`nombre_libro LIKE ?`);
    parametros.push(`%${q}%`);
  }
  if (filtros.length > 0) {
    sql += ` where ${filtros.join(" and ")}`;
  }
  */
  console.log(sql);
  const [libroEncontrado] = await db.execute(sql, parametros);
  res.send({ libros: [libroEncontrado] });
});
