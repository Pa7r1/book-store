import express from "express";
import bookControl from "../controladores/librosControler.js";
import userControl  from "../controladores/usuariosControler.js";

const Router = express.Router();

Router.get("/libros/:id", bookControl.searchById);
Router.get("/libros", bookControl.all);
Router.get("/libros/Search", bookControl.advancedSearching);
Router.post("/libros", bookControl.add);
Router.get("/libros/categoria", bookControl.searchByCategory);

Router.get("/usuario", userControl.users);
Router.post("/usuario/register", userControl.registerUser);
export default Router;
