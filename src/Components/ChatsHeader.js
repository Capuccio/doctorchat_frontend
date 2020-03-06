import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";

const ChatHeader = () => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>Chat Pacientes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    padding: 20,
    backgroundColor: "#3bd1c5"
  },
  Text: {
    color: "white",
    fontSize: 26,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default ChatHeader;
