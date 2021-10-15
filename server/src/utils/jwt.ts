import jwt from "jsonwebtoken";
import { UserMongooseType } from "../interfaces/user";
import { JWT_SECRET } from "../constants";


export const getUserToken = (user: UserMongooseType): string=>{
    if(!JWT_SECRET){ throw new Error("no JWT secret") }
    const payload = {email: user.email, username: user.username, id: user._id}
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1d"})
    return token;
}

    



