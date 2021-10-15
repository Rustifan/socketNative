import { Express, urlencoded, json } from "express";
import { validateRegisteringUser, validateUserLogin } from "./validators";


export const useMiddleware = (app: Express)=>{
    app.use(json())
    app.use(urlencoded({extended: true}))
    
}

export { validateRegisteringUser, validateUserLogin }