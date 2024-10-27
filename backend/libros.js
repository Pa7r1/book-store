import express from "express";
import { db } from "./db.js";

export const librosRouter = express.Router();

librosRouter.get("/", async (req, res) => {
  const [libros] = await db.execute("select * from libros");
  res.send({ libros });
});
