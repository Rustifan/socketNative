import socketIOClient, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { setSocketRouter } from "./socketRouter";

const ENDPOINT = "http://192.168.5.14:8080"; // change if dynamic ip for testing

let socket: null | Socket<DefaultEventsMap, DefaultEventsMap> = null;

const initSocket = (): Socket<DefaultEventsMap, DefaultEventsMap> => {
  socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
  setSocketRouter(socket);
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};
