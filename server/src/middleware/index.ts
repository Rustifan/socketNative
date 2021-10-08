import { Express, urlencoded, json } from "express";

export const useMiddleware = (app: Express)=>{
    app.use(json())
    app.use(urlencoded({extended: true}))
 
}