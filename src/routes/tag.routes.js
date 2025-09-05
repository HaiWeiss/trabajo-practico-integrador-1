import { Router } from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagByID,
  updateTag
} from "../controllers/tag.controller.js";
import {
  createTagValidation,
  updateTagValidation
} from "../middlewares/validations/tag.validation.js";
import { validate } from "../middlewares/validations/validate.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const tagRouter = Router();

// GET /api/tags → usuario autenticado
tagRouter.get("/", isAuthenticated, getAllTags);

// GET /api/tags/:id → solo admin
tagRouter.get("/:id", isAuthenticated, adminMiddleware, getTagByID);

// POST, PUT, DELETE → solo admin
tagRouter.post("/", isAuthenticated, adminMiddleware, [...createTagValidation], validate, createTag);
tagRouter.put("/:id", isAuthenticated, adminMiddleware, [...updateTagValidation], validate, updateTag);
tagRouter.delete("/:id", isAuthenticated, adminMiddleware, deleteTag);

export default tagRouter;
