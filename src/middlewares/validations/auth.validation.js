import { body } from "express-validator";
import User from "../../models/user.model.js";
import bcrypt from "bcrypt";

export const registerValidation = [
  body("username")
    .notEmpty().withMessage("Debes ingresar un nombre de usuario")
    .isLength({ min: 3, max: 20 }).withMessage("El username debe tener entre 3 y 20 caracteres")
    .custom(async (value) => {

      const user = await User.findOne({ where: { username: value } });
      if (user) throw new Error("El username ya está en uso");

      return true;
    }),
  body("email")
    .notEmpty().withMessage("Debe ingresar un correo electrónico")
    .isEmail().withMessage("Debe ingresar un email válido")
    .isLength({ max: 100 }).withMessage("El email no debe superar los 100 caracteres")
    .custom(async (value) => {

      const user = await User.findOne({ where: { email: value } });
      if (user) throw new Error("El email ya está registrado");

      return true;
    }),
  body("password")
    .notEmpty().withMessage("Debe ingresar una contraseña")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("Debe ingresar un rol válido (admin, user)")
];

export const loginValidation = [
  body("email")
    .notEmpty().withMessage("Debe ingresar un correo electrónico")
    .isEmail().withMessage("Debe ingresar un email válido")
    .custom(async (value, { req }) => {

      const user = await User.findOne({ where: { email: value } });
      if (!user) throw new Error("Email no registrado");

      req.userFound = user;

      return true;
    }),
  body("password")
    .notEmpty().withMessage("Debe ingresar una contraseña")
    .custom(async (value, { req }) => {

      const user = req.userFound;

      if (user) {

        const match = await bcrypt.compare(value, user.password);
        if (!match) throw new Error("Contraseña incorrecta");
        
      }
      return true;
    })
];
