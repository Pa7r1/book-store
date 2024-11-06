import { db } from "./mysql.js";
const TABLA = "libros";

const BuscarTodosLosLibros = async () => {
  const sql = `SELECT * FROM ${TABLA}`;
  const [libros] = await db.execute(sql);
  return libros;
};

const busquedaPorNombre = async (titulo) => {
  const sql = `SELECT * FROM libros WHERE titulo LIKE ?`;
  const [libroPorNombre] = await db.execute(sql, [`%${titulo}%`]);
  return libroPorNombre;
};

const busquedaPorIsbn = async (isbn) => {
  const sql = `SELECT * FROM libros WHERE isbn = ? `;
  const [libroISBN] = await db.execute(sql, [isbn]);
  return libroISBN;
};

const CrearNuevoLibro = async ({
  titulo,
  isbn,
  año_publicacion,
  precio_venta,
  precio_alquiler,
  id_editorial,
  estado,
}) => {
  const sql = `INSERT INTO libros
  (titulo, isbn, año_publicacion, precio_venta, precio_alquiler, id_editorial, estado) 
  VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const { nuevoLibro } = await db.execute(sql, [
    titulo,
    isbn,
    año_publicacion,
    precio_venta,
    precio_alquiler,
    id_editorial,
    estado,
  ]);
  return nuevoLibro;
};

export const modeloLibros = {
  BuscarTodosLosLibros,
  CrearNuevoLibro,
  busquedaPorIsbn,
  busquedaPorNombre,
};
