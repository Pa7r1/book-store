import express from "express";
import { db } from "./db.js";

export const empleadosRouter = express.Router();

empleadosRouter.get("/", async (req, res) => {
  const [empleados] = await db.execute("select * from empleados");
  res.send({ empleados });
});

empleadosRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const sql = "select * from empleados where id_empleado=?";
  const [empleados] = await db.execute(sql, [id]);

  if (empleados.length === 0) {
    res.status(204).send([0]);
  } else {
    res.send({ empleado: empleados[0] });
  }
});
