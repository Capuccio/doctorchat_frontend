import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Register from "./src/Pages/Register";
import Login from "./src/Pages/Login";
import Principal from "./src/Pages/Principal";
import Chat from "./src/Pages/Chat";
import DoctorChats from "./src/Pages/DoctorChats";
import Settings from "./src/Pages/Settings";
import CheckNewDoctors from "./src/Pages/CheckNewDoctors";

const PrincipalPages = createSwitchNavigator(
  {
    Principal,
    DoctorChats,
    Chat,
    Settings,
    Login,
    Register,
    CheckNewDoctors
  },
  {
    initialRouteName: "Principal"
  }
);

export default createAppContainer(PrincipalPages);
