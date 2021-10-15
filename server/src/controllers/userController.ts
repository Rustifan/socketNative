import { Request, Response } from "express";
import { UserRegistration,  UserMongooseType, UserResponseType, UserLogin } from "../interfaces";
import { UserModel } from "../db";
import { hash, compare } from "bcrypt";
import { getUserToken } from "../utils";
import { findByEmail } from "../db/models/user";

export const register = async (req: Request, res: Response) => {
  const user: UserRegistration = req.body;

  const passwordHash = await hash(user.password, 12);
  const newUser = await UserModel.create({
    username: user.username,
    email: user.email,
    passwordHash,
    isDriver: false,
  });
  res.status(200).json(getUserResponse(newUser));
};
  
export const login = async (req: Request, res: Response) => {
  const userLogin: UserLogin = req.body;
  const user = await findByEmail(userLogin.email);
  if(!user){ return res.status(400).send("Invalid email or password")}
  const isPasswordValid = await compare(userLogin.password, user.passwordHash)
  if(!isPasswordValid){ return res.status(400).send("Invalid email or password" )} 
  return res.status(200).json(getUserResponse(user))
}

// helper functions

const getUserResponse = (user: UserMongooseType): UserResponseType => {
  const token = getUserToken(user);
  return {email: user.email, username: user.username, token}
}