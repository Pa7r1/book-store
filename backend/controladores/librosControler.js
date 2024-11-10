import bookModel from "../modelos/librosModelo.js";
import catchedAsync from "../red/catchAsync.js";
import response from "../red/respuesta.js";

const all = async (req, res) => {
  const allBooks = await bookModel.searchAllBooks();
  response(res, 200, allBooks);
};

const searchById = async (req, res) => {
  const { id } = req.params;
  const LibrosId = await bookModel.searchById(id);
  response(res, LibrosId);
};

searchByIdAndDelete = async (req, res) => {
  const { id } = req.params;
  const LibrosId = await bookModel.findByIdAndDelete(id);
  response(res, LibrosId);
};

const searchByCategory = async (req, res) => {
  const { Categoria } = req.body;

  const categorias = await bookModel.searchByCategory(Categoria);
  response(res, 200, categorias);
};

const advancedSearching = async (req, res) => {
  const { q } = req.query;
  // "1273827432"

  if (/^\d+$/.test(q)) {
    const elQueBuscas = await bookModel.searchByIsbn(q);
    response(res, 200, elQueBuscas);
  } else {
    const elQueBuscas = await bookModel.searchByName([q]);
    response(res, 200, elQueBuscas);
  }
};

const addProduct = async (req, res) => {
  const {
    titulo,
    isbn,
    año_publicacion,
    precio_venta,
    precio_alquiler,
    id_editorial,
    estado,
  } = req.body;

  const newBook = await bookModel.createNewBook({
    titulo,
    isbn,
    año_publicacion,
    precio_venta,
    precio_alquiler,
    id_editorial,
    estado,
  });

  response(res, 200, newBook);
};

// cambié la forma de exportar por un error en mi local(volver a original)
const bookControl = {
  all: catchedAsync(all),
  addProduct: catchedAsync(addProduct),
  advancedSearching: catchedAsync(advancedSearching),
  searchByCategory: catchedAsync(searchByCategory),
  searchById: catchedAsync(searchById),
};

export default bookControl;
