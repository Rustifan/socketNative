import { BeAnObject, IObjectWithTypegooseFunction } from "@typegoose/typegoose/lib/types";
import { User } from "../db/models/user";
import { Document } from "mongoose";

export interface UserRegistration{
    
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export interface UserLogin{
    email: string;
    password: string;
}

export type UserMongooseType = Document<any, BeAnObject, any> & User & IObjectWithTypegooseFunction & {
    _id: any;
}

export type UserResponseType = {
    username: string;
    email: string;
    token: string;
}