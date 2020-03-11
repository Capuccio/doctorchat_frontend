import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CheckNewDoctorsHeader = ({ navigation }) => {
  const getBack = () => {
    navigation.navigate("Principal");
  };

  return (
    <View style={styles.Container}>
      <View style={styles.InfoHeaderContainer}>
        <TouchableOpacity style={styles.GetBack} onPress={() => getBack()}>
          <Ionicons name="md-arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <Text style={styles.Text}>Nuevos Doctores</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    padding: 20,
    backgroundColor: "#3bd1c5"
  },
  InfoHeaderContainer: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: "row",
    alignItems: "center"
  },
  GetBack: {
    marginRight: 10
  },
  Text: {
    color: "white",
    fontSize: 26
  }
});

export default CheckNewDoctorsHeader;
