import { db } from "./mysql.js";
import { ErrorDelCliente } from "../red/errors.js";

const BuscarTodosLosLibros = async () => {
  const sql = `SELECT * FROM libros`;
  const [libros] = await db.execute(sql);
  return libros;
};

const busquedaPorID = async (id) => {
  const sql = `SELECT * FROM libros WHERE id_libro = ?`;
  const [libros] = await db.execute(sql, [id]);
  if (!libros) throw new ErrorDelCliente("Id invalido");
  return libros;
};
const busquedaPorCategoria = async (Categoria) => {
  const sql = `SELECT l.*, c.nombre AS nombre_categoria 
  FROM libros l JOIN libros_categorias lc ON l.id_libro = lc.id_libro
  JOIN categorias c ON lc.id_categoria = c.id_categoria
  WHERE nombre = ?`;
  const [libros] = await db.execute(sql, [Categoria]);
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
  busquedaPorCategoria,
  busquedaPorID,
};
