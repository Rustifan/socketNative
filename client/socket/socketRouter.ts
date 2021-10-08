import { recieveLocations, removeLocation } from "./onFunctions";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
 
export const setSocketRouter = (socket: Socket<DefaultEventsMap, DefaultEventsMap>)=>{
    
    socket.on("recieveLocations", recieveLocations);
    socket.on("removeLocation", removeLocation);

}


