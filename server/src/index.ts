import express from "express";
import { Server } from "http";
import socketio from "socket.io";
import { PORT } from "./constants";
import { mongoInit } from "./db";
import { useMiddleware } from "./middleware";
import { setRoutes } from "./router";
import { socketRoutes } from "./socket";

const app = express();
app.set("port", PORT);
const http = new Server(app);
const io = new socketio.Server(http)

mongoInit()

socketRoutes(io);   
useMiddleware(app);
setRoutes(app);

http.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});




