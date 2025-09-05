import { body, param } from "express-validator";
import Article from "../../models/article.model.js";

export const createArticleValidation = [
    body("title")
        .notEmpty().withMessage("Debe ingresar el titulo")
        .isLength({ min: 3, max: 200 }).withMessage("El titulo debe tener entre 3 y 200 caracteres"),
    body("content")
        .notEmpty().withMessage("Debe ingresar el contenido")
        .isLength({ min: 50 }).withMessage("El contenido debe tener al menos 50 caracteres"),
    body("excerpt")
        .optional()
        .isLength({ max: 500 }).withMessage("El excerpt no debe superar los 500 caracteres"),
    body("status")
        .optional()
        .isIn(["published", "archived"]).withMessage("El status debe ser published o archived"),
    body("user_id")
        .notEmpty().withMessage("Debe ingresar el user_id")
        .isInt().withMessage("El user_id debe ser un número entero")
];

export const updateArticleValidation = [
    param("id")
        .isInt()
        .withMessage("El id debe ser un entero")
        .custom(async (value) => {
            const article = await Article.findByPk(value);

            if (!article) {
                throw new Error("El articulo no existe");
            }
        }),
    body("title")
        .optional()
        .isLength({ min: 3, max: 200 }).withMessage("El titulo debe tener entre 3 y 200 caracteres"),
    body("content")
        .optional()
        .isLength({ min: 50 }).withMessage("El contenido debe tener al menos 50 caracteres"),
    body("excerpt")
        .optional()
        .isLength({ max: 500 }).withMessage("El excerpt no debe superar los 500 caracteres"),
    body("status")
        .optional()
        .isIn(["published", "archived"]).withMessage("El status debe ser published o archived"),
    body("user_id")
        .optional()
        .isInt().withMessage("El user_id debe ser un número entero")
];