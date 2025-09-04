import { body } from "express-validator";
import User from "../../models/user.model.js";

export const createUserValidation = [
    body("username")
        .notEmpty()
        .withMessage("Debes ingresar un nombre de usuario(username)")
        .custom(async (value) => {
            const user = await User.findOne({
                where: { username: value }
            })

            if (user) {
                throw new Error("El username ya esta en uso");
            }
            return true;
        }),
    body("email")
        .notEmpty()
        .withMessage("Debe ingresar un correo electronico(email)")
        .isEmail()
        .withMessage("Debe ingresar un email valido")
        .withMessage("Debe ingresar un nombre de usuario de 3 a 20 caracteres")
        .custom(async (value) => {
            const user = await User.findOne({
                where: { email: value },
            })

            if (user) {
                throw new Error("El email ya esta registrado")
            }
        }),
    body("password")
        .notEmpty()
        .withMessage("Debe ingresar una contraseña(password)"),
    body("role")
        .isIn(["user", "admin"])
        .withMessage("Debe ingresar un rol valido(admin, user)")
]