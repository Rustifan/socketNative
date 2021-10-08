import { Router } from "express";
import { catchAsync } from "../error";
import { register } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/register", catchAsync(register))



export default userRouter;