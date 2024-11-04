import { query, body } from "express-validator";

export const validarUsuario = () => [
  body("nombre").isAlpha().notEmpty().isLength({ max: 100 }),
  body("username").isAlphanumeric().notEmpty().isLength({ max: 25 }),
  body("apellido").isAlpha().notEmpty().isLength({ max: 100 }),
  body("contraseña").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0,
  }),
  body("email").isEmail().notEmpty().isLength({ max: 100 }),
  body("tipo_usuario").isAlpha().notEmpty().isLength({ max: 9 }),
  body("direccion").notEmpty().isLength({ max: 150 }),
  body("telefono").isAlphanumeric().notEmpty().isLength({ max: 15 }),
];

export const validarBusqueda = () => [
  query("q")
    .isLength({ max: 100 })
    .notEmpty()
    .blacklist(`" ' / \ | () {} [] > < = ! `),
];
