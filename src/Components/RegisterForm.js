import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker
} from "react-native";

const RegisterForm = props => {
  let doctorListItems = props.doctorList.map((doctorsData, i) => {
    return (
      <Picker.Item
        key={i}
        label={`${doctorsData.name} ${doctorsData.lastname}`}
        value={doctorsData._id}
      />
    );
  });

  return (
    <View style={styles.Register}>
      <Text style={styles.Title}>REGISTRARSE</Text>

      <TextInput
        style={styles.Input}
        onChangeText={name => props.changeText("name", name)}
        value={props.state.name}
        placeholder="Nombre"
      />

      <TextInput
        style={styles.Input}
        onChangeText={lastname => props.changeText("lastname", lastname)}
        value={props.state.lastname}
        placeholder="Apellido"
      />

      <TextInput
        style={styles.Input}
        onChangeText={email => props.changeText("email", email)}
        value={props.state.email}
        placeholder="Correo"
      />

      <TextInput
        style={styles.Input}
        onChangeText={birthday => props.changeText("birthday", birthday)}
        value={props.state.birthday}
        placeholder="Fecha de Nacimiento: 01/01/2020"
      />

      <Picker
        selectedValue={props.state.genre}
        style={styles.BirthDaySelect}
        onValueChange={itemValue => {
          props.changeText("genre", itemValue);
        }}
      >
        <Picker.Item label="Hombre" value="M" />
        <Picker.Item label="Mujer" value="F" />
      </Picker>

      <TextInput
        style={styles.Input}
        onChangeText={password => props.changeText("password", password)}
        secureTextEntry
        value={props.state.password}
        placeholder="Clave"
      />

      <Picker
        selectedValue={props.state.doctor}
        style={styles.DoctorSelect}
        onValueChange={itemValue => {
          props.changeText("doctor", itemValue);
        }}
      >
        <Picker.Item label="Su doctor:" value="D" />
        {doctorListItems}
      </Picker>

      <View style={styles.Button}>
        <Button
          color="#3bd1c5"
          title="Registrarse"
          onPress={props.handleRegister}
        />
      </View>
      <View style={styles.Button}>
        <Button
          color="#3bd1c5"
          title="Atras"
          onPress={() => props.navigation.navigate("Login")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Register: {
    height: "71%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10%"
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
    marginTop: 30
  },
  BirthDaySelect: {
    height: 50,
    width: 125,
    marginTop: 20
  },
  DoctorSelect: {
    height: 50,
    width: 140,
    marginTop: 20
  },
  Button: {
    width: "88%",
    marginTop: 20
  }
});

export default RegisterForm;
