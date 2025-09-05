import { Router } from "express";
import { 
    deleteUser, 
    getAllUsers, 
    getUserByID, 
    updateUser 
} from "../controllers/user.controller.js";
import { 
    updateUserValidation
} from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validations/validate.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const userRouter = Router();


userRouter.get("/", isAuthenticated, adminMiddleware, getAllUsers);
userRouter.get("/:id", isAuthenticated, adminMiddleware, getUserByID);
userRouter.put("/:id", isAuthenticated, adminMiddleware, [...updateUserValidation], validate, updateUser);
userRouter.delete("/:id", isAuthenticated, adminMiddleware, deleteUser);

export default userRouter;
