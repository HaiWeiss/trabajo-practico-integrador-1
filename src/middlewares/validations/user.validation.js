import { body, param } from "express-validator";
import User from "../../models/user.model.js";

export const createUserValidation = [
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
        .isIn(["user", "admin"]).withMessage("Debe ingresar un rol valido (admin, user)")
];

export const updateUserValidation = [
    param("id")
        .isInt()
        .withMessage("El id debe ser un entero")
        .custom(async (value) => {
            const user = await User.findByPk(value);

            if (!user) {
                throw new Error("El usuario no existe");
            }
        }),
    body("username")
        .optional()
        .isLength({ min: 3, max: 20 }).withMessage("El username debe tener entre 3 y 20 caracteres")
        .custom(async (value, { req }) => {
            if (!value) return true;

            const user = await User.findOne({ where: { username: value } });
            if (user && user.id != req.params.id) throw new Error("El username ya está en uso");

            return true;
        }),
    body("email")
        .optional()
        .isEmail().withMessage("Debe ingresar un email válido")
        .isLength({ max: 100 }).withMessage("El email no debe superar los 100 caracteres")
        .custom(async (value, { req }) => {

            if (!value) return true;

            const user = await User.findOne({ where: { email: value } });
            if (user && user.id != req.params.id) throw new Error("El email ya está registrado");
            return true;
        }),
    body("password")
        .optional()
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("role")
        .optional()
        .isIn(["user", "admin"]).withMessage("Debe ingresar un rol valido (admin, user)")
];