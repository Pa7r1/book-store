import { modelUser } from "../modelos/usuariosModelo.js";

import bcrypt from "bcrypt";
const TABLA = "libros";
//archivo destinado para pasar los parametros a la consulta

const registro = async (req, res) => {
  const {
    nombre,
    apellido,
    username,
    email,
    contraseña,
    tipo_usuario,
    direccion,
    telefono,
  } = req.body;

  if (
    !nombre ||
    !apellido ||
    !username ||
    !email ||
    !contraseña ||
    !tipo_usuario ||
    !direccion ||
    !telefono
  ) {
    return res.status(400).send({
      ok: false,
      msg: `Faltan campos obligatorios: nombre,
        apellido,
        username,
        email,
        contraseña,
        tipo_usuario,
        direccion,
        telefono`,
    });
  }
  const userN = await modelUser.buscaPorUsername(username);
  if (userN) {
    res.status(400).send({ error: true, msg: `Username en uso` });
  }

  const salt = await bcrypt.genSalt(10);
  const contraseñaHashed = await bcrypt.hash(contraseña, salt);

  const nuevoUsuario = await modelUser.create({
    nombre,
    apellido,
    username,
    email,
    contraseña: contraseñaHashed,
    tipo_usuario,
    direccion,
    telefono,
  });
};

export const userControl = {
  registro,
};
