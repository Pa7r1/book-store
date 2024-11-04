import express from "express";
import cors from "cors";
import { conectarDB } from "./db.js";
import { usuarioRouter } from "./usuarios.js";
import { busquedaRouter, categoriasRouter } from "./librosControlers.js";
import { authRouter } from "./auth.js";

conectarDB();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("todo ok desde api book-store");
});

app.use("/librosControlers", busquedaRouter, categoriasRouter);
app.use("/usuarios", usuarioRouter);
app.use("/auth", authRouter);
app.listen(port, () => {
  console.log(`servidor levantado en el puerto: ${port}`);
});
