import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const UserInfoModal = ({
  userData,
  modalUserInfoVisible,
  modalUserInfoOpenClose
}) => {
  return (
    <Modal visible={modalUserInfoVisible} animationType="slide">
      <ScrollView>
        <TouchableOpacity
          style={{ position: "absolute", zIndex: 1, top: 10, left: 10 }}
          onPress={modalUserInfoOpenClose}
        >
          <AntDesign name="arrowleft" size={32} color="#3bd1c5" />
        </TouchableOpacity>
        <View>
          <Image
            style={{ width: "100%", height: 250, resizeMode: "stretch" }}
            source={{ uri: userData.profilePicture }}
          />
        </View>
        <View style={styles.InfoRow}>
          <View>
            <Text style={styles.TitleInfo}>Nombre:</Text>
            <Text> {userData.name} </Text>
          </View>
          <View style={styles.SecondData}>
            <Text style={styles.TitleInfo}>Apellido:</Text>
            <Text> {userData.lastname} </Text>
          </View>
        </View>
        <View style={styles.InfoRow}>
          <View>
            <Text style={styles.TitleInfo}>Correo:</Text>
            <Text> {userData.email} </Text>
          </View>
          <View style={styles.SecondData}>
            <Text style={styles.TitleInfo}>Genero:</Text>
            <Text> {userData.genre === "M" ? "Hombre" : "Mujer"} </Text>
          </View>
        </View>
        <View style={styles.InfoRow}>
          <View>
            <Text style={styles.TitleInfo}>Fecha de Nacimiento:</Text>
            <Text> {userData.birthday} </Text>
          </View>
          <View style={styles.SecondData}>
            <Text style={styles.TitleInfo}>Estado:</Text>
            <Text> {userData.status === 0 ? "Inhabilitado" : "Activo"} </Text>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  InfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    alignItems: "center"
  },
  SecondData: {
    position: "absolute",
    right: 10
  },
  TitleInfo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  }
});

export default UserInfoModal;
