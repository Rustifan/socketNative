import { getModelForClass, prop } from "@typegoose/typegoose";
import { BeAnObject, IObjectWithTypegooseFunction } from "@typegoose/typegoose/lib/types";
import { Document } from "mongoose";

export class User{
    @prop({required: true})
    public username!: string;

    @prop({required: true})
    public email!: string;

    @prop({required: true})
    public passwordHash!: string;

    @prop({})
    public isDriver?: boolean;

}


export const UserModel = getModelForClass(User)

export const findByEmail = async (email: string)=>{
    return await UserModel.findOne({email: email})
}

