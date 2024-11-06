import express from "express";
import { librosControl } from "../controladores/librosControler.js";

//import { userControlers } from "../controladores/userControlers.js";
//archivo destinado a mostrar los funciones dentro de usercontrolers o controladores
//archivo tambien destinado para hacer metodos http (get,post,put,delete)

const Router = express.Router();

Router.get("/libros", librosControl.todos);
Router.get("/libros/Search", librosControl.busquedaAvanzada);
Router.post("/libros", librosControl.agregar);

export default Router;
