import { modeloLibros } from "../modelos/librosModelo.js";
//TABLA = "libros";

const todos = async (req, res) => {
  const todosLibros = await modeloLibros.BuscarTodosLosLibros();
  res.send(todosLibros);
};

const busquedaAvanzada = async (req, res) => {
  const { q } = req.query;
  // "1273827432"

  if (/^\d+$/.test(q)) {
    const elQueBuscas = await modeloLibros.busquedaPorIsbn(q);
    res.send({ libro: elQueBuscas });
  } else {
    const elQueBuscas = await modeloLibros.busquedaPorNombre([q]);
    res.send({ libro: elQueBuscas });
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

  res.send({
    libro: {
      titulo,
      isbn,
      año_publicacion,
      precio_venta,
      precio_alquiler,
      estado,
    },
  });
};

export const librosControl = {
  todos,
  agregar,
  busquedaAvanzada,
};
