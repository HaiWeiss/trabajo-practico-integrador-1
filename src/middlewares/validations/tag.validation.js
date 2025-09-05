import { body, param } from "express-validator";
import Tag from "../../models/tag.model.js";

export const createTagValidation = [
    body("name")
        .notEmpty().withMessage("Debe ingresar el nombre de la etiqueta")
        .isLength({ min: 2, max: 30 }).withMessage("El nombre debe tener entre 2 y 30 caracteres")
        .custom(async (value) => {

            const tag = await Tag.findOne({ where: { name: value } });
            if (tag) throw new Error("La etiqueta ya existe");

            return true;
        })
];

export const updateTagValidation = [
    param("id")
        .isInt()
        .withMessage("El id debe ser un entero")
        .custom(async (value) => {
            const tag = await Tag.findByPk(value);

            if (!tag) {
                throw new Error("La etiqueta no existe");
            }
        }),
    body("name")
        .optional()
        .isLength({ min: 2, max: 30 }).withMessage("El nombre debe tener entre 2 y 30 caracteres")
        .custom(async (value, { req }) => {

            if (!value) return true;

            const tag = await Tag.findOne({ where: { name: value } });
            if (tag && tag.id != req.params.id) throw new Error("La etiqueta ya existe");

            return true;
        })
];