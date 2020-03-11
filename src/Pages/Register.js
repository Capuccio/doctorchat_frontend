import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import RegisterForm from "../Components/RegisterForm";
import api from "../../utils/api";

const Register = props => {
  const [registerData, setRegisterData] = useState({
    form: {
      name: "",
      lastname: "",
      email: "",
      birthday: "",
      genre: "M",
      password: "",
      tokenNotification: "",
      level: props.navigation.getParam("registerAs"),
      status: props.navigation.getParam("registerAs"),
      doctor: "D"
    }
  });
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getDoctorList = async () => {
      let answer = await api.getDoctorList(1);

      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
        return;
      }

      if (isMounted) {
        setDoctorList(answer.msg);
      }
    };

    const getTokenNotifications = async () => {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (status !== "granted") {
        alert(
          "Notificaciones",
          "No hay permisos de notificaciones, no podrá recibir notificaciones cuando le escriban"
        );
        return;
      }

      let tokenNotification = await Notifications.getExpoPushTokenAsync();

      if (isMounted) {
        setRegisterData({
          form: {
            ...registerData.form,
            tokenNotification
          }
        });
      }

      return;
    };

    getTokenNotifications();
    getDoctorList();

    return () => (isMounted = false);
  }, []);

  const changeText = (inputKey, inputValue) => {
    setRegisterData({
      form: {
        ...registerData.form,
        [inputKey]: inputValue
      }
    });
  };

  const validateDoctor = registerAs => {
    var answer;
    if (registerAs === 1) {
      answer = registerData.form.doctor == "D" ? true : false;
    } else {
      answer = false;
    }

    return answer;
  };

  const handleRegister = async () => {
    let registerAs = props.navigation.getParam("registerAs");

    if (
      !registerData.form.name.trim() ||
      !registerData.form.lastname.trim() ||
      !registerData.form.email.trim() ||
      !registerData.form.birthday.trim() ||
      !registerData.form.password.trim() ||
      validateDoctor(registerAs)
    ) {
      Alert.alert(
        "Campos vacíos",
        "Rellenar todos los capos o elegir un doctor válido"
      );
    } else {
      const answer = await api.register(registerData.form);
      Alert.alert(answer.title, answer.msg);
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <RegisterForm
          state={registerData.form}
          changeText={changeText}
          handleRegister={handleRegister}
          navigation={props.navigation}
          doctorList={doctorList}
          registerAs={props.navigation.getParam("registerAs")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default Register;
