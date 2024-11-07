import { modeloLibros } from "../modelos/librosModelo.js";
import catchedAsync from "../red/catchAsync.js";
import respuesta from "../red/respuesta.js";
//TABLA = "libros";

const todos = async (req, res) => {
  const todosLibros = await modeloLibros.BuscarTodosLosLibros();
  respuesta(res, 200, todosLibros);
};

const buscaPorID = async (req, res) => {
  const { id } = req.params;
  const LibrosId = await modeloLibros.busquedaPorID(id);
  respuesta(res, LibrosId);
};

const organizarPorCategoria = async (req, res) => {
  const { Categoria } = req.body;

  const categorias = await modeloLibros.busquedaPorCategoria(Categoria);
  respuesta(res, 200, categorias);
};

const busquedaAvanzada = async (req, res) => {
  const { q } = req.query;
  // "1273827432"

  if (/^\d+$/.test(q)) {
    const elQueBuscas = await modeloLibros.busquedaPorIsbn(q);
    respuesta(res, 200, elQueBuscas);
  } else {
    const elQueBuscas = await modeloLibros.busquedaPorNombre([q]);
    respuesta(res, 200, elQueBuscas);
  }
};

const agregar = async (req, res) => {
  const {
    titulo,
    isbn,
    año_publicacion,
    precio_venta,
    precio_alquiler,
    id_editorial,
    estado,
  } = req.body;

  const LibroNuevo = await modeloLibros.CrearNuevoLibro({
    titulo,
    isbn,
    año_publicacion,
    precio_venta,
    precio_alquiler,
    id_editorial,
    estado,
  });

  respuesta(res, 200, LibroNuevo);
};

export const librosControl = {
  todos: catchedAsync(todos),
  agregar: catchedAsync(agregar),
  busquedaAvanzada: catchedAsync(busquedaAvanzada),
  organizarPorCategoria: catchedAsync(organizarPorCategoria),
  buscaPorID: catchedAsync(buscaPorID),
};
