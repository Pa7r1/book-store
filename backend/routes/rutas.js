import express from "express";
import { librosControl } from "../controladores/librosControler.js";
import { UserControl } from "../controladores/usuariosControler.js";

const Router = express.Router();

Router.get("/libros/:id", librosControl.buscaPorID);
Router.get("/libros", librosControl.todos);
Router.get("/libros/Search", librosControl.busquedaAvanzada);
Router.post("/libros", librosControl.agregar);
Router.get("/libros/categoria", librosControl.organizarPorCategoria);

Router.get("/usuario", UserControl.Usarios);
Router.post("/usuario/register", UserControl.registrarUsuario);
export default Router;
