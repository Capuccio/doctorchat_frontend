import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const LoginForm = props => {
  return (
    <View style={styles.Login}>
      <Text style={styles.Title}>INICIAR</Text>

      <TextInput
        style={styles.Input}
        onChangeText={email => props.changeText("email", email)}
        value={props.user.email}
        placeholder="Correo"
      />

      <TextInput
        style={styles.Input}
        onChangeText={password => props.changeText("password", password)}
        value={props.user.password}
        secureTextEntry
        placeholder="Clave"
      />

      <View style={styles.Button}>
        <Button color="#3bd1c5" title="Iniciar" onPress={props.handleLogin} />
      </View>

      <View style={styles.Button}>
        <Button
          color="#3bd1c5"
          title="Registrarse como Paciente"
          onPress={() =>
            props.navigation.navigate("Register", {
              registerAs: 1
            })
          }
        />
      </View>

      <View style={styles.Button}>
        <Button
          color="#3bd1c5"
          title="Registrarse como Doctor"
          onPress={() =>
            props.navigation.navigate("Register", {
              registerAs: 2
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Login: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  Title: {
    fontSize: 36,
    color: "#4f4f4f",
    fontWeight: "bold"
  },
  Input: {
    height: 34,
    width: "80%",
    borderColor: "#4f4f4f",
    borderBottomWidth: 1,
    color: "black",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    opacity: 0.85,
    fontSize: 16,
    marginTop: 20
  },
  Button: {
    width: "88%",
    marginTop: 20
  }
});

export default LoginForm;
