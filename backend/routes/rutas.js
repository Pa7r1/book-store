import express from "express";
import bookControl from "../controladores/librosControler.js";
import userControl from "../controladores/usuariosControler.js";
import { cartControl } from "../controladores/carritoControler.js";

const Router = express.Router();

// libros
Router.get("/libros/:id", bookControl.searchById); // busqueda por id
Router.get("/libros", bookControl.all); // obtiene todo los libros
Router.get("/libros/Search", bookControl.advancedSearching); // busqueda avanzada
Router.get("/libros/categoria", bookControl.searchByCategory); // busqueda por categoria
Router.get("/categorias", bookControl.allCategory); // obtiene todas las categorias
Router.get("/autores", bookControl.allAutor); // obtiene todos los autores
Router.get("/editoriales", bookControl.AllEditorial); // obtiene las editoriales
Router.post("/libros", bookControl.addProduct); // agrega un producto

//usuarios
Router.get("/usuario", userControl.users);
Router.post("api/usuario/register", userControl.registerUser);

//ventas
Router.get("/carrito", cartControl.cartShop);
Router.post("/venta", cartControl.addSale);
export default Router;
