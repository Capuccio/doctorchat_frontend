import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert
} from "react-native";
import SettingsForm from "../Components/SettingsForm";
import * as ImagePicker from "expo-image-picker";
import api from "../../utils/api";

const Settings = ({ navigation }) => {
  const [formSetting, setFormSetting] = useState({
    _id: navigation.getParam("myID"),
    localPicture: "0",
    profilePicture64: "",
    name: "",
    lastname: "",
    birthday: "",
    newPassword: "",
    genre: ""
  });
  const [buttonOptions, setButtonOptions] = useState({
    DisabledOne: false,
    DisabledTwo: false,
    ButtonText: {
      imagePicker: "Foto de Perfil",
      update: "Actualizar"
    }
  });

  useEffect(() => {
    let isMounted = true;

    const getUserData = async () => {
      let answer = await api.getUserData(navigation.getParam("myID"));

      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
        return;
      }

      if (isMounted) {
        setFormSetting({
          ...formSetting,
          name: answer.msg.name,
          lastname: answer.msg.lastname,
          birthday: answer.msg.birthday,
          genre: answer.msg.genre,
          localPicture: answer.msg.profilePicture
        });
      }
    };

    getUserData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePictureProfile = async () => {
    setButtonOptions({
      ...buttonOptions,
      DisabledOne: true,
      ButtonText: {
        ...buttonOptions.ButtonText,
        imagePicker: "Escogiendo foto"
      }
    });

    let answer = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1080, 1080],
      quality: 1,
      base64: true
    });

    if (!answer.cancelled) {
      setFormSetting({
        ...formSetting,
        localPicture: answer.uri,
        profilePicture64: answer.base64
      });
    }

    setButtonOptions({
      ...buttonOptions,
      DisabledOne: false,
      ButtonText: {
        ...buttonOptions.ButtonText,
        imagePicker: "Foto de Perfil"
      }
    });
  };

  const changeText = async (inputKey, inputValue) => {
    setFormSetting({
      ...formSetting,
      [inputKey]: inputValue
    });
  };

  const handleRegister = async () => {
    setButtonOptions({
      ...buttonOptions,
      DisabledOne: true,
      DisabledTwo: true,
      ButtonText: {
        ...buttonOptions.ButtonText,
        update: "Actualizando..."
      }
    });

    if (
      formSetting.name == "" ||
      formSetting.lastname == "" ||
      formSetting.birthday == ""
    ) {
      Alert.alert(
        "Campos",
        "Los campos Nombre, Apellido y Fecha de Nacimiento no pueden estar vacíos"
      );
      return;
    }

    let answer = await api.updateData(formSetting);

    Alert.alert(answer.title, answer.msg);

    setButtonOptions({
      ...buttonOptions,
      DisabledOne: false,
      DisabledTwo: false,
      ButtonText: {
        ...buttonOptions.ButtonText,
        update: "Actualizar"
      }
    });
  };

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView>
        <SettingsForm
          state={formSetting}
          handlePictureProfile={handlePictureProfile}
          handleRegister={handleRegister}
          changeText={changeText}
          navigation={navigation}
          buttonOptions={buttonOptions}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default Settings;
