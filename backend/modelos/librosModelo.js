import { db } from "./mysql.js";
import { clientError } from "../red/errors.js";

const findAllBooks = async () => {
  const sql = `SELECT * FROM libros`;
  const [libros] = await db.execute(sql);
  return libros;
};

const findByIdAndDelete = async (id) => {
  const sql = `DELETE * FROM libros WHERE id_libro = ?`;
  const [libros] = await db.execute(sql, [id]);
  return [libros];
};

const findById = async (id) => {
  const sql = `SELECT * FROM libros WHERE id_libro = ?`;
  const [libros] = await db.execute(sql, [id]);
  if (!libros) {
    throw new clientError("Id invalido", 400);
  }
  return libros;
};
const findByCategory = async (Categoria) => {
  const sql = `SELECT l.*, c.nombre AS nombre_categoria 
  FROM libros l JOIN libros_categorias lc ON l.id_libro = lc.id_libro
  JOIN categorias c ON lc.id_categoria = c.id_categoria
  WHERE nombre = ?`;
  const [libros] = await db.execute(sql, [Categoria]);
  return libros;
};

const findByName = async (titulo) => {
  const sql = `SELECT * FROM libros WHERE titulo LIKE ?`;
  const [libroPorNombre] = await db.execute(sql, [`%${titulo}%`]);
  return libroPorNombre;
};

const findByIsbn = async (isbn) => {
  const sql = `SELECT * FROM libros WHERE isbn = ? `;
  const [libroISBN] = await db.execute(sql, [isbn]);
  return libroISBN;
};

const createNewBook = async ({
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

const findAllCategory = async () => {
  const sql = `SELECT nombre FROM categorias`;
  const [categorias] = await db.execute(sql);
  return categorias;
};

const findAllAutor = async () => {
  const sql = `SELECT nombre FROM usuarios`;
  const [autores] = await db.execute(sql);
  return autores;
};

const findAllEditorial = async () => {
  const sql = `SELECT nombre FROM editoriales`;
  const [editoriales] = await db.execute(sql);
  return editoriales;
};

// cambié la forma de exportar por un error en mi local(volver a original)
const bookModel = {
  findAllBooks,
  findByIdAndDelete,
  findById,
  findByCategory,
  findByName,
  findByIsbn,
  createNewBook,
  findAllCategory,
  findAllAutor,
  findAllEditorial,
};
export default bookModel;
