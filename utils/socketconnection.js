import io from "socket.io-client";
const socket = io("http://192.168.43.223:5000", {
  reconnection: true
  //   reconnectionDelay: 1000,
  //   reconnectionDelayMax: 5000,
  //   reconnectionAttempts: Infinity
});
export default socket;
