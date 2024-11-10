import UserModel from "../modelos/usuariosModelo.js";
import catchedAsync from "../red/catchAsync.js";
import jwt from "jsonwebtoken";
import respuesta from "../red/respuesta.js";
import bcryp from "bcrypt";

const users = async (req, res) => {
  const AllUser = await UserModel.verUsuarios();
  response(res, 200, AllUser);
};

const registerUser = async (req, res) => {
  const {
    nombre,
    apellido,
    username,
    email,
    contraseña,
    telefono,
    id_direccion,
  } = req.body;

  existUser = await UserModel.findUserByEmail(email);
  if (existUser) {
    response(res, 400, "El Usuario ya existe");
  }

  const salt = await bcryp.genSalt(10);
  const passHashed = await bcryp.hash(contraseña, salt);

  payload = {};
  token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2 h",
  });

  const newUser = await UserModel.createUser({
    nombre,
    apellido,
    username,
    email,
    contraseña: passHashed,
    telefono,
    id_direccion,
  });

  response(res, 200, newUser);
};
//  cambié la forma de exportar por un error en mi local(volver a original)
const userControl = {
  registerUser: catchedAsync(registerUser),
  users: catchedAsync(users),
};
export default userControl;
