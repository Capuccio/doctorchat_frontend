import io from "socket.io-client";
const socket = io("localhost:5000", {
  reconnection: true
  //   reconnectionDelay: 1000,
  //   reconnectionDelayMax: 5000,
  //   reconnectionAttempts: Infinity
});
export default socket;
