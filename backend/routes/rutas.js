import express from "express";
import bookControl from "../controladores/librosControler.js";
import userControl from "../controladores/usuariosControler.js";
import { cartControl } from "../controladores/carritoControler.js";

const Router = express.Router();

// libros
Router.get("/libros/:id", bookControl.searchById);
Router.get("/libros", bookControl.all);
Router.get("/libros/Search", bookControl.advancedSearching);
Router.post("/libros", bookControl.addProduct);
Router.get("/libros/categoria", bookControl.searchByCategory);

//usuarios
Router.get("/usuario", userControl.users);
Router.post("/usuario/register", userControl.registerUser);

//ventas
Router.get("/carrito", cartControl.cartShop);
Router.post("/venta", cartControl.addSale);
export default Router;
