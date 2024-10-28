import express from "express";
import { db } from "./db.js";

export const librosRouter = express.Router();

librosRouter.get("/", async (req, res) => {
  const [libros] = await db.execute("select * from libros");
  res.send({ libros });
});

librosRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  const sql = "select * from libros where id_libros=?";
  const [libros] = await db.execute(sql, [id]);

  if (libros.length === 0) {
    res.status(204).send({});
  } else {
    res.send({ libro: libros[0] });
  }
});

librosRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await db.execute("delete from libros where id_libros=?", [id]);

  res.send({ id: parseInt(id) });
});
