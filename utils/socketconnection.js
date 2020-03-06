import io from "socket.io-client";
const socket = io("https://doctorchat-backend.herokuapp.com/", {
  reconnection: true
  //   reconnectionDelay: 1000,
  //   reconnectionDelayMax: 5000,
  //   reconnectionAttempts: Infinity
});
export default socket;
