import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserByID, updateUser } from "../controllers/user.controller.js";
import { createUserValidation } from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validations/validate.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserByID);
userRouter.post("/", [...createUserValidation], validate, createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;