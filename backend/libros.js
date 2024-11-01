import express from "express";
import { buscarLibro } from "./librosControlers.js";
import { validarBusqueda } from "./middleware.js";
export const libroRouter = express.Router();

libroRouter.get("/librosControlers", validarBusqueda, buscarLibro);
