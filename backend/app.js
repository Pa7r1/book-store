import express from "express";
import cors from "cors";
import { conectarDB } from "./db.js";
import { librosRouter } from "./libros.js";

conectarDB();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/libros", librosRouter);

app.get("/", (req, res) => {
  res.send("todo ok desde api book-store");
});

app.listen(port, () => {
  console.log(`servidor levantado en el puerto: ${port}`);
});
