import React, { useState } from "react";
import { View, Alert, StyleSheet, AsyncStorage } from "react-native";
import LoginForm from "../Components/LoginForm";
import api from "../../utils/api";

const Login = props => {
  const [userData, setUserData] = useState({
    form: {
      email: "",
      password: ""
    }
  });

  const changeText = (inputKey, inputValue) => {
    setUserData({
      form: {
        ...userData.form,
        [inputKey]: inputValue
      }
    });
  };

  const handleLogin = async () => {
    if (
      userData.form.email.trim() == "" ||
      userData.form.password.trim() == ""
    ) {
      Alert.alert("Formulario", "Debe rellenar todos los campos");
    } else {
      const answer = await api.login(userData.form);

      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
      } else {
        let { msg } = answer;

        if (msg.status === 1) {
          try {
            await AsyncStorage.setItem("userData", JSON.stringify(msg));

            props.navigation.navigate("Principal");
          } catch (error) {
            console.log("Error al Guardar: ", error);
          }
        } else if (msg.status === 2) {
          Alert.alert(
            "Verificación",
            "Tu cuenta debe ser aceptada por otro doctor"
          );
        } else {
          Alert.alert("Inhabilitada", "Tu doctor te ha Inhabilitado");
        }
      }
    }
  };

  return (
    <View style={styles.Container}>
      <LoginForm
        user={userData.form}
        changeText={changeText}
        handleLogin={handleLogin}
        navigation={props.navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default Login;
