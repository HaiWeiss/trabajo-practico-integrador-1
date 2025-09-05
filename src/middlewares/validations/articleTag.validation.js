import { body, param } from "express-validator";
import ArticleTag from "../../models/articleTag.model.js";

export const createArticleTagValidation = [
    body("article_id")
        .notEmpty().withMessage("Debe ingresar el article_id")
        .isInt().withMessage("El article_id debe ser un número entero"),
    body("tag_id")
        .notEmpty().withMessage("Debe ingresar el tag_id")
        .isInt().withMessage("El tag_id debe ser un número entero")
];

export const updateArticleTagValidation = [
    param("id")
        .isInt()
        .withMessage("El id debe ser un entero")
        .custom(async (value) => {
            const articleTag = await ArticleTag.findByPk(value);

            if (!articleTag) {
                throw new Error("La relacion articulo/tag no existe");
            }
        }),
    body("article_id")
        .optional()
        .isInt().withMessage("El article_id debe ser un numero entero"),
    body("tag_id")
        .optional()
        .isInt().withMessage("El tag_id debe ser un numero entero")
];