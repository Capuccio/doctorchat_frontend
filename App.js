import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Register from "./src/Pages/Register";
import Login from "./src/Pages/Login";
import Principal from "./src/Pages/Principal";
import Chat from "./src/Pages/Chat";
import DoctorChats from "./src/Pages/DoctorChats";

const PrincipalPages = createSwitchNavigator(
  {
    Principal,
    DoctorChats,
    Chat,
    Login,
    Register
  },
  {
    initialRouteName: "Principal"
  }
);

export default createAppContainer(PrincipalPages);
