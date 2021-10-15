import { Router } from "express";
import { catchAsync } from "../error";
import { register, login } from "../controllers/userController";
import { validateRegisteringUser, validateUserLogin } from "../middleware"

const userRouter = Router();

userRouter.post("/register", validateRegisteringUser, catchAsync(register))
userRouter.post("/login", validateUserLogin, catchAsync(login))


export default userRouter;