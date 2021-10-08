import { Express } from "express";
import { userRouter } from ".";

export const setRoutes = (app: Express)=>{

    app.get("/", (_, res)=>{res.send(new Date())})

    app.use("/api/users/", userRouter);

}