import express from "express";
import cors from "cors";
import { conectarDB } from "./db.js";

import { busquedaRouter, categoriasRouter } from "./librosControlers.js";

conectarDB();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("todo ok desde api book-store");
});

app.use("/librosControlers", busquedaRouter, categoriasRouter);

app.listen(port, () => {
  console.log(`servidor levantado en el puerto: ${port}`);
});
