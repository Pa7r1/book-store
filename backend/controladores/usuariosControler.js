import  UserModel  from "../modelos/usuariosModelo.js";
import catchedAsync from "../red/catchAsync.js";
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
    id_roles,
  } = req.body;

  user = await UserModel.findUserByEmail(email);
  if (user) {
    response(res, 400, "El Usuario ya existe");
  }

  const salt = await bcryp.genSalt(10);
  const passHashed = await bcryp.hash(contraseña, salt);

  const newUser = await UserModel.createUser({
    nombre,
    apellido,
    username,
    email,
    contraseña: passHashed,
    telefono,
    id_direccion,
    id_roles,
  });

  response(res, 200, newUser);
};
//  cambié la forma de exportar por un error en mi local(volver a original)
const userControl = {
  registerUser: catchedAsync(registerUser),
  users: catchedAsync(users),
};
export default userControl
