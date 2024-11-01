import { db } from "./db.js";

export const buscarLibro = async (req, res) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).send({ mesaje: "no hay busqueda" });
  }

  const sql = "select * from libro where nombre_libro = ? ";
  const libroEncontrado = await db.execute(sql, [q]);

  res.send({ libros: [libroEncontrado] });
};
