import { Router } from "express";
import {
  createArticleTag,
  deleteArticleTag
} from "../controllers/articleTag.controller.js";
import {
  createArticleTagValidation
} from "../middlewares/validations/articleTag.validation.js";
import { validate } from "../middlewares/validations/validate.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";

const articleTagRouter = Router();

// POST → agregar etiqueta (solo autor)
articleTagRouter.post("/", 
  isAuthenticated, 
  ownerMiddleware, 
  [...createArticleTagValidation], 
  validate, 
  createArticleTag
);

// DELETE → remover etiqueta (solo autor)
articleTagRouter.delete("/:id", 
  isAuthenticated, 
  ownerMiddleware, 
  deleteArticleTag
);

export default articleTagRouter;
