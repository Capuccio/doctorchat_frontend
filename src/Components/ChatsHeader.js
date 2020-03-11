import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";

const ChatHeader = ({ myID, navigation }) => {
  const moveToSettings = () => {
    navigation.navigate("Settings", {
      myID
    });
  };

  const moveToCheckDoctors = () => {
    navigation.navigate("CheckNewDoctors");
  };

  const closeSession = async () => {
    await AsyncStorage.removeItem("userData");
    navigation.navigate("Principal");
  };

  return (
    <View style={styles.Container}>
      <View style={styles.DataContainer}>
        <Text style={styles.Text}>Chat Pacientes</Text>
        <TouchableOpacity
          style={[styles.PositionIcons, styles.Settings]}
          onPress={moveToSettings}
        >
          <AntDesign name="setting" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.PositionIcons, styles.CheckUsers]}
          onPress={moveToCheckDoctors}
        >
          <SimpleLineIcons name="user-following" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.PositionIcons, styles.Exit]}
          onPress={closeSession}
        >
          <Ionicons name="md-exit" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    padding: 20,
    backgroundColor: "#3bd1c5"
  },
  DataContainer: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: "row",
    alignItems: "center"
  },
  Text: {
    color: "white",
    fontSize: 26
  },
  PositionIcons: {
    position: "absolute"
  },
  Settings: {
    right: 80
  },
  CheckUsers: {
    right: 40
  },
  Exit: {
    right: 5
  }
});

export default ChatHeader;
