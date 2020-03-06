import React, { useState, useEffect } from "react";
import { View, Text, AsyncStorage } from "react-native";
import api from "../../utils/api";

const Principal = props => {
  useEffect(() => {
    const checkData = async () => {
      try {
        let userData = await AsyncStorage.getItem("userData");
        if (userData.length > 0) {
          let dataJson = JSON.parse(userData);

          if (dataJson.level === 2) {
            props.navigation.navigate("DoctorChats", {
              myID: dataJson.myId,
              level: dataJson.level
            });
          } else {
            let { msg } = await api.getDoctor(dataJson.myId);

            props.navigation.navigate("Chat", {
              myID: dataJson.myId,
              level: dataJson.level,
              idUser: msg._id
            });
          }
        }
      } catch (error) {
        props.navigation.navigate("Login");
      }
    };

    checkData();
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Principal;
