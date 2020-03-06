import React from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SendMessage = ({
  textChat,
  handleMessage,
  sendingMessage,
  editableText
}) => {
  return (
    <View style={styles.Container}>
      <TextInput
        editable={editableText}
        placeholder="Mensaje"
        style={styles.InputMsg}
        multiline
        onChangeText={text => handleMessage(text)}
        value={textChat}
      />
      <TouchableOpacity onPress={() => sendingMessage()}>
        {textChat.length > 0 && (
          <Ionicons name="md-send" size={36} style={styles.SendIcon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    alignItems: "center"
  },
  InputMsg: {
    height: 50,
    width: "85%",
    backgroundColor: "white",
    paddingLeft: 15,
    fontSize: 16
  },
  SendIcon: {
    marginHorizontal: 10
  }
});

export default SendMessage;
