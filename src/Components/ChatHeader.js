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
import OptionsModal from "./OptionsModal";
import UserInfoModal from "./UserInfoModal";

const ChatHeader = ({ myID, idUser, level, navigation, socket }) => {
  const [userData, setUserData] = useState({});
  const [modalOptionsVisible, setModalOptionsVisible] = useState(false);
  const [modalUserInfoVisible, setModalUserInfoVisible] = useState(false);

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
    return () => {};
  }, []);

  const moveChats = () => {
    socket.close();
    navigation.navigate("Principal");
  };

  const modalOptionsOpenClose = () => {
    setModalOptionsVisible(!modalOptionsVisible);
  };

  const modalUserInfoOpenClose = () => {
    setModalUserInfoVisible(!modalUserInfoVisible);
  };

  // Doctor Options

  const blockPatient = async () => {
    if (userData.status === 0) {
      Alert.alert("Paciente Bloqueado", "El paciente ya está bloqueado");
    } else {
      let user = userData;
      user.status = 0;
      setUserData(user);

      socket.emit("blockPatient", userData._id);
    }

    setModalOptionsVisible(!modalOptionsVisible);
    return;
  };

  const unlockPatient = async () => {
    if (userData.status === 1) {
      Alert.alert("Paciente Desbloqueado", "El paciente ya está desbloqueado");
    } else {
      let answer = await api.unlockPatient({ idPatient: userData._id });
      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
      }
    }

    setModalOptionsVisible(!modalOptionsVisible);
    return;
  };

  // Patient Options

  const closeSession = async () => {
    await AsyncStorage.removeItem("userData");
    moveChats();
  };

  const moveToSettings = async () => {
    navigation.navigate("Settings", {
      myID
    });
  };

  socket.on("patientBlocked", msg => {
    closeSession();
  });

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.InfoContainer}>
        {level === 2 && (
          <TouchableOpacity style={styles.GetBack} onPress={() => moveChats()}>
            <Ionicons name="md-arrow-back" size={26} color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => modalUserInfoOpenClose()}
        >
          <View style={styles.ProfileContainer}>
            <Image
              source={{ uri: userData.profilePicture }}
              style={styles.ProfilePicture}
            />
          </View>
          <View>
            <Text style={styles.NameUser}>
              {userData.name} {userData.lastname}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Options}
          onPress={() => modalOptionsOpenClose()}
        >
          <SimpleLineIcons name="options-vertical" size={18} color="white" />
        </TouchableOpacity>

        <OptionsModal
          level={level}
          modalOptionsVisible={modalOptionsVisible}
          modalOptionsOpenClose={modalOptionsOpenClose}
          blockPatient={blockPatient}
          unlockPatient={unlockPatient}
          closeSession={closeSession}
          moveToSettings={moveToSettings}
        />

        <UserInfoModal
          userData={userData}
          modalUserInfoVisible={modalUserInfoVisible}
          modalUserInfoOpenClose={modalUserInfoOpenClose}
        />
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
