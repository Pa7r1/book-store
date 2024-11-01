import express from "express";
import { buscarLibro, validarBusqueda } from "./librosControlers.js";

export const libroRouter = express.Router();

libroRouter.get("/librosControlers", validarBusqueda, buscarLibro);
