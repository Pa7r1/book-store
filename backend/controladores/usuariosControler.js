import { UserModel } from "../modelos/usuariosModelo.js";
import catchedAsync from "../red/catchAsync.js";
import respuesta from "../red/respuesta.js";
import bcryp from "bcrypt";

const Usarios = async (req, res) => {
  const AllUser = await UserModel.verUsuarios();
  respuesta(res, 200, AllUser);
};

const registrarUsuario = async (req, res) => {
  const {
    nombre,
    apellido,
    username,
    email,
    contraseña,
    telefono,
    id_direccion,
    id_roles,
  } = req.body;

  user = await UserModel.findUserByEmial(email);
  if (user) {
    respuesta(res, 400, "El Usuario ya existe");
  }

  const salt = await bcryp.genSalt(10);
  const passHashed = await bcryp.hash(contraseña, salt);

  const nuevoUsuario = await UserModel.crearUsuario({
    nombre,
    apellido,
    username,
    email,
    contraseña: passHashed,
    telefono,
    id_direccion,
    id_roles,
  });

  respuesta(res, 200, nuevoUsuario);
};

export const UserControl = {
  registrarUsuario: catchedAsync(registrarUsuario),
  Usarios: catchedAsync(Usarios),
};
