import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import api from "../../utils/api";

const ChatHeader = ({ idUser, level, navigation, socket }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      let answer = await api.getUserData(idUser);

      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
        return;
      }

      setUserData(answer.msg);
    };

    getUserData();
    return () => {
      // setUserData();
    };
  }, []);

  const moveChats = () => {
    socket.close();
    navigation.navigate("Principal");
  };

  const closeSession = async () => {
    socket.close();
    await AsyncStorage.removeItem("userData");
    moveChats();
  };

  let unknow_picture =
    userData.genre == "M"
      ? "https://i.imgur.com/ihhfBI4.jpg"
      : "https://i.imgur.com/u3fYPb8.jpg";

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.InfoContainer}>
        {level === 2 && (
          <TouchableOpacity style={styles.GetBack} onPress={() => moveChats()}>
            <Ionicons name="md-arrow-back" size={26} color="white" />
          </TouchableOpacity>
        )}
        <View style={styles.ProfileContainer}>
          {userData.profilePicture != null ? (
            <Image
              source={{ uri: userData.profilePicture }}
              style={styles.ProfilePicture}
            />
          ) : (
            <Image
              source={{ uri: unknow_picture }}
              style={styles.ProfilePicture}
            />
          )}
        </View>
        <View>
          <Text style={styles.NameUser}>
            {userData.name} {userData.lastname}
          </Text>
        </View>
        {level === 2 ? (
          <TouchableOpacity style={styles.Options}>
            <SimpleLineIcons name="options-vertical" size={18} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.Options}
            onPress={() => closeSession()}
          >
            <Ionicons name="md-exit" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#3bd1c5"
  },
  InfoContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center"
  },
  GetBack: {
    padding: 10
  },
  ProfileContainer: {
    marginRight: 5
  },
  ProfilePicture: {
    width: 48,
    height: 48,
    borderRadius: 60
  },
  NameUser: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  Options: {
    position: "absolute",
    right: 17,
    padding: 5
  }
});

export default ChatHeader;
