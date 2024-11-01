import { db } from "./db.js";

export const buscarLibro = async (req, res) => {
  const q = req.query.q;
  const filtros = [];
  const parametros = [];

  if (!q) {
    return res.status(400).send({ mesaje: "no hay busqueda" });
  }

  if (q != undefined) {
    filtros.push(`nombre_libro LIKE "%${q}%"`);
    parametros.push(q);
  }

  let sql = "select * from libro";

  if (filtros.length > 0) {
    sql += ` where ${filtros}`;
  }

  const [libroEncontrado] = await db.execute(sql, parametros);
  res.send({ libros: [libroEncontrado] });
};
