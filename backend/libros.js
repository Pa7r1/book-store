import express from "express";
import { buscarLibro } from "./librosControlers.js";

export const libroRouter = express.Router();

libroRouter.get("/librosControlers", buscarLibro);
