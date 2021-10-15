import {Request, Response, NextFunction} from "express";
import { UserLogin } from "../../interfaces";
import Joi from "joi";
const validateUserLogin = (req: Request, res: Response, next: NextFunction)=>{
    const login: UserLogin = req.body;
        
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })

    const { error } = schema.validate(login)
    if(error){
        return res.status(400).json(error);
    }
    return next();
}

export default validateUserLogin;