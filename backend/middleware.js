// validacion de busqueda de libros
export const validarBusqueda = (req, res, next) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).send({ mesaje: "no hay busqueda" });
  }

  if (q == ">" || q == "<" || q == `"` || q == "'" || q == ";") {
    return res.status(400).send({ mensaje: "mala peticion" });
  }

  if (q.length > 100) {
    return res.status(400).send({ mensaje: "peticion demasiado larga" });
  }
  next();
};
