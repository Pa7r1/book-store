import bookModel from "../modelos/librosModelo.js";
import catchedAsync from "../red/catchAsync.js";
import response from "../red/respuesta.js";

const all = async (req, res) => {
  const allBooks = await bookModel.searchAllBooks();
  response(res, 200, allBooks);
};

const searchById = async (req, res) => {
  const { id } = req.params;
  const LibrosId = await bookModel.findById(id);
  response(res, 200, LibrosId);
};

const searchByIdAndDelete = async (req, res) => {
  const { id } = req.params;
  const LibrosId = await bookModel.findByIdAndDelete(id);
  response(res, 200, LibrosId);
};

const searchByCategory = async (req, res) => {
  const { Categoria } = req.body;

  const categorias = await bookModel.findByCategory(Categoria);
  response(res, 200, categorias);
};

const advancedSearching = async (req, res) => {
  const { q } = req.query;
  // "1273827432"

  if (/^\d+$/.test(q)) {
    const elQueBuscas = await bookModel.findByIsbn(q);
    response(res, 200, elQueBuscas);
  } else {
    const elQueBuscas = await bookModel.findByName([q]);
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

const allCategory = async (req, res) => {
  const categories = await bookModel.findAllCategory();
  response(res, 200, categories);
};

const allAutor = async (req, res) => {
  const autores = await bookModel.findAllAutor();
  response(res, 200, autores);
};

const AllEditorial = async (req, res) => {
  const editoriales = await bookModel.findAllEditorial();
  response(res, 200, editoriales);
};

// cambié la forma de exportar por un error en mi local(volver a original)
const bookControl = {
  all: catchedAsync(all),
  searchById: catchedAsync(searchById),
  searchByIdAndDelete: catchedAsync(searchByIdAndDelete),
  searchByCategory: catchedAsync(searchByCategory),
  advancedSearching: catchedAsync(advancedSearching),
  addProduct: catchedAsync(addProduct),
  allCategory: catchedAsync(allCategory),
  allAutor: catchedAsync(allAutor),
  AllEditorial: catchedAsync(AllEditorial),
};

export default bookControl;
