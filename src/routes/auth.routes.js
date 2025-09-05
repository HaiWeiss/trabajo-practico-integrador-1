import { Router } from "express";
import { 
    register, 
    login, 
    getProfile, 
    updateProfile, 
    logout } from "../controllers/auth.controller.js";
import { 
    registerValidation, 
    loginValidation 
} from "../middlewares/validations/auth.validation.js";
import { validate } from "../middlewares/validations/validate.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", [...registerValidation], validate, register);
authRouter.post("/login", [...loginValidation], validate, login);

authRouter.get("/profile", isAuthenticated, getProfile);
authRouter.put("/profile", isAuthenticated, updateProfile);
authRouter.post("/logout", isAuthenticated, logout);

export default authRouter;
