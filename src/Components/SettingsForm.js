import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker,
  Image
} from "react-native";

const SettingsForm = props => {
  return (
    <View style={styles.Update}>
      <Text style={styles.Title}>Configuración</Text>

      <View style={{ marginTop: 20 }}>
        <Image
          style={styles.profilePicture}
          source={{ uri: props.state.localPicture }}
        />
      </View>

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
        onChangeText={birthday => props.changeText("birthday", birthday)}
        value={props.state.birthday}
        placeholder="Fecha de Nacimiento: 01/01/2020"
      />

      <TextInput
        style={styles.Input}
        onChangeText={newPassword =>
          props.changeText("newPassword", newPassword)
        }
        secureTextEntry
        value={props.state.newPassword}
        placeholder="Nueva clave"
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

      <View style={styles.Button}>
        <Button
          color="#3bd1c5"
          disabled={props.buttonOptions.DisabledOne}
          title={props.buttonOptions.ButtonText.imagePicker}
          onPress={props.handlePictureProfile}
        />
      </View>

      <View style={styles.Button}>
        <Button
          color="#3bd1c5"
          disabled={props.buttonOptions.DisabledOne}
          title={props.buttonOptions.ButtonText.update}
          onPress={props.handleRegister}
        />
      </View>

      <View style={styles.Button}>
        <Button
          color="#3bd1c5"
          disabled={props.buttonOptions.DisabledTwo}
          title="Atras"
          onPress={() => props.navigation.navigate("Principal")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Update: {
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
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 80
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
    marginTop: 25
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

export default SettingsForm;
