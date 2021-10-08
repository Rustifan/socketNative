import { Request, Response } from "express";
import { UserRegistration } from "../interfaces";
import { UserModel } from "../db";
import { hash } from "bcrypt";

export const register = async (req: Request, res: Response) => {
  const user: UserRegistration = req.body;

  const passwordHash = await hash(user.password, 12);
  const newUser = await UserModel.create({
    username: user.username,
    email: user.email,
    passwordHash,
    isDriver: false,
  });
  
  res.status(200).json(newUser);
};
