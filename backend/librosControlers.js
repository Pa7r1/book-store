import { db } from "./db.js";

//busqueda de libros
export const buscarLibro = async (req, res) => {
  const q = req.query.q;
  const filtros = [];
  const parametros = [];

  if (q != undefined) {
    filtros.push(`nombre_libro LIKE ?`);
    parametros.push(`%${q}%`);
  }

  let sql = "select * from libro";

  if (filtros.length > 0) {
    sql += ` where ${filtros.join(" and ")}`;
  }

  const [libroEncontrado] = await db.execute(sql, parametros);
  res.send({ libros: [libroEncontrado] });
};
