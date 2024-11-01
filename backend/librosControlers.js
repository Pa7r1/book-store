import { db } from "./db.js";

export const validarBusqueda = (req, res, next) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).send({ mesaje: "no hay busqueda" });
  }

  if (q == ">" || q == "<" || q == `"` || q == "'" || q == ";") {
    return res.status(400).send({ mensaje: "mala peticion" });
  }

  if (q.length > 100) {
    return res.status(400).send({ mensaje: "peticion demasiado larga" });
  }
  next();
};

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
