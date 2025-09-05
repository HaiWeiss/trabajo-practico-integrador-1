import { body, param } from "express-validator";
import Profile from "../../models/profile.model.js";

export const createProfileValidation = [
    body("user_id")
        .notEmpty().withMessage("Debe ingresar el user_id")
        .isInt().withMessage("El user_id debe ser un número entero")
        .custom(async (value) => {

            const profile = await Profile.findOne({ where: { user_id: value } });
            if (profile) throw new Error("El usuario ya tiene un perfil");

            return true;
        }),
    body("first_name")
        .notEmpty().withMessage("Debe ingresar el nombre")
        .isLength({ max: 50 }).withMessage("El nombre no debe superar los 50 caracteres"),
    body("last_name")
        .notEmpty().withMessage("Debe ingresar el apellido")
        .isLength({ max: 50 }).withMessage("El apellido no debe superar los 50 caracteres"),
    body("biography")
        .optional(),
    body("avatar_url")
        .optional()
        .isLength({ max: 255 }).withMessage("La URL del avatar no debe superar los 255 caracteres"),
    body("birth_date")
        .optional()
        .isDate().withMessage("Debe ingresar una fecha válida (YYYY-MM-DD)")
];

export const updateProfileValidation = [
    param("id")
        .isInt()
        .withMessage("El id debe ser un entero")
        .custom(async (value) => {
            const profile = await Profile.findByPk(value);

            if (!profile) {
                throw new Error("El perfil no existe");
            }
        }),
    body("first_name")
        .optional()
        .isLength({ max: 50 }).withMessage("El nombre no debe superar los 50 caracteres"),
    body("last_name")
        .optional()
        .isLength({ max: 50 }).withMessage("El apellido no debe superar los 50 caracteres"),
    body("biography")
        .optional(),
    body("avatar_url")
        .optional()
        .isLength({ max: 255 }).withMessage("La URL del avatar no debe superar los 255 caracteres"),
    body("birth_date")
        .optional()
        .isDate().withMessage("Debe ingresar una fecha válida (YYYY-MM-DD)")
];