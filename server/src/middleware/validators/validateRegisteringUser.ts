import {Request, Response, NextFunction} from "express";
import { UserRegistration } from "../../interfaces";
import Joi from "joi";

const validateRegisteringUser = (req: Request, res: Response, next: NextFunction)=>{
    const user: UserRegistration = req.body;
    
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        repeatPassword: Joi.any().valid(Joi.ref('password')).required(),
        username: Joi.string().required()
    })

    const { error } = schema.validate(user);
    if(error){
       return res.status(400).json(error)
    }
    next();

}

export default validateRegisteringUser;