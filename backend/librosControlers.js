import express from "express";
import { db } from "./db.js";
import { param, query, validationResult } from "express-validator";
import { validarBusqueda } from "./middleware.js";

export const busquedaRouter = express.Router();
export const categoriasRouter = express.Router();
export const allRouter = express.Router();

allRouter.get("/libros", async (req, res) => {
  const sql =
    "select titulo, isbn, año_publicacion, precio_venta, precio_alquiler from libros";

  const [libros] = await db.execute(sql);
  res.status(200).send({ LIBROS: libros });
});

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

categoriasRouter.get("/categoria", async (req, res) => {
  let sql =
    "SELECT l.*, c.nombre AS nombre_categoria FROM libros l JOIN libros_categorias lc ON l.id_libro = lc.id_libro JOIN categorias c ON lc.id_categoria = c.id_categoria;";
  const [librosCategorias] = await db.execute(sql);
  res.send({ libros: [librosCategorias] });
});

/*
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_usuario_by_rol`(
IN idRol INT)
BEGIN
	SELECT u.nombre, u.apellido, u.email, u.fecha_alta, u.fecha_modificacion FROM usuarios u
	INNER JOIN roles r ON u.id_rol = r.id_rol
    WHERE r.id_rol = idRol;
END
*/
