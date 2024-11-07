import express from "express";
import { librosControl } from "../controladores/librosControler.js";

//import { userControlers } from "../controladores/userControlers.js";
//archivo destinado a mostrar los funciones dentro de usercontrolers o controladores
//archivo tambien destinado para hacer metodos http (get,post,put,delete)

const Router = express.Router();
Router.get("/libros/:id", librosControl.buscaPorID);
Router.get("/libros", librosControl.todos);
Router.get("/libros/Search", librosControl.busquedaAvanzada);
Router.post("/libros", librosControl.agregar);
Router.get("/libros/categoria", librosControl.organizarPorCategoria);

export default Router;
// vamos de nuevo
//libros viene en un arreglo
//quiero llamar a todos los libros de controlers pero nose como mostrarlos en respuesta

//se puede hacer eso???
//jajajaj
//como hago para que pueda exportar susses y error en un solo archivo?
//tendrian que llegar como funcion

//que culiao me maree en mis pensamientos 21:49

//estuve cerca, cuando necesite exportar dos funciones por separado no puedo hacer funcion flecha en el metodo http,
//hay que declarar fuction comun y corriente para que pueda tener un requerimiento valido
