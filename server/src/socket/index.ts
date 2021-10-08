import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { locationSenders } from "../locations/locationSenders";
import { LocationObject } from "../locations/locationTypes";

export const socketRoutes = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => {
  io.on("connection", (socket) => {
    socket.on("sendLocation", (location: LocationObject) => {
      locationSenders.changeLocation(socket.id, location);
    });
    
    socket.on("stopWatchingPosition", () => {
      removeUserLocation(io, socket)
    });
    
    socket.on("disconnect", () => {
      removeUserLocation(io, socket)
    });

  });

  setInterval(() => {
    io.emit("ping", { data: new Date() });
  }, 1000);

  setInterval(() => {
    const changes = locationSenders.getChanges();
    if (changes.length) {
      const locations = changes.map((user) => {
        return { user, location: locationSenders.getLocation(user) };
      });
      io.emit("recieveLocations", locations);
    }
  }, 3000);
};

const removeUserLocation = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => {
  io.emit("removeLocation", socket.id);
  locationSenders.removeLocation(socket.id);
};
