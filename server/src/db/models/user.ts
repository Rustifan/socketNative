import { getModelForClass, prop } from "@typegoose/typegoose";

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


