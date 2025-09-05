import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleByID,
  getMyArticles,
  getMyArticleByID,
  updateArticle
} from "../controllers/article.controller.js";
import {
  createArticleValidation,
  updateArticleValidation
} from "../middlewares/validations/article.validation.js";
import { validate } from "../middlewares/validations/validate.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";

const articleRouter = Router();

articleRouter.get("/", isAuthenticated, getAllArticles);
articleRouter.get("/:id", isAuthenticated, getArticleByID);
articleRouter.get("/user", isAuthenticated, getMyArticles);
articleRouter.get("/user/:id", isAuthenticated, getMyArticleByID);

articleRouter.post("/", isAuthenticated, [...createArticleValidation], validate, createArticle);

articleRouter.put("/:id", isAuthenticated, ownerMiddleware, [...updateArticleValidation], validate, updateArticle);

articleRouter.delete("/:id", isAuthenticated, ownerMiddleware, deleteArticle);

export default articleRouter;
