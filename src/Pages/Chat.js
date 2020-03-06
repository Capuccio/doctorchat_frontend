import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Clipboard,
  Dimensions
} from "react-native";
import ChatHeader from "../Components/ChatHeader";
import SendMessage from "../Components/SendMessage";
import socket from "../../utils/socketconnection";
import api from "../../utils/api";

const Chat = props => {
  let { navigation } = props;

  const [chat, setChat] = useState([]);
  const [textChat, setTextChat] = useState("");
  const [editableText, setEditableText] = useState(false);
  const [patientData, setPatientData] = useState();
  const [_isMounted, set_isMounted] = useState(false);
  const chatList = useRef(null);

  useEffect(() => {
    set_isMounted(true);
    if (!socket.connected) {
      socket.open();
    }
    const getChat = async () => {
      let level = navigation.getParam("level", "1");
      let idPatient =
        level === 2
          ? navigation.getParam("idUser", "0")
          : navigation.getParam("myID", "0");

      setPatientData(idPatient);

      let answer = await api.getChat(idPatient);

      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
        return;
      }

      if (answer.msg === null) {
        setChat([]);
      } else {
        setChat(answer.msg);
      }

      setTimeout(() => {
        chatList.current.scrollToEnd();
      }, 500);

      socket.emit("joinRoom", idPatient);
      setEditableText(true);
    };

    getChat();
  }, []);

  const handleMessage = text => {
    setTextChat(text);
  };

  const sendingMessage = async () => {
    setTextChat("");
    let arrayChat = [...chat];

    let newMessage = {
      id_user: navigation.getParam("myID", "0"),
      text: textChat
    };

    arrayChat.push(newMessage);
    setChat(arrayChat);

    newMessage.idPatient = patientData;

    socket.emit("newMessage", newMessage);
  };

  socket.on("received", async msg => {
    let arrayChat = [...chat];
    arrayChat.push(msg);
    if (_isMounted) {
      setChat(arrayChat);
    }
  });

  socket.on("disconnect", async reason => {
    if (reason != "io client disconnect") {
      socket.connect();
      socket.emit("joinRoom", patientData);
    }
  });

  const renderChat = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.Chats,
          item.id_user === navigation.getParam("myID", "0")
            ? styles.MyText
            : styles.YourText
        ]}
        onPress={() => Clipboard.setString(item.text)}
      >
        <Text style={{ fontSize: 15 }}> {item.text} </Text>
      </TouchableOpacity>
    );
  };

  const separatorChat = () => {
    return <View style={styles.Separator}></View>;
  };

  return (
    <KeyboardAvoidingView
      style={styles.Container}
      keyboardVerticalOffset={1}
      behavior={Platform.OS === "android" ? "height" : "padding"}
      enabled
    >
      <ChatHeader
        idUser={navigation.getParam("idUser", "0")}
        level={navigation.getParam("level", "1")}
        navigation={navigation}
        socket={socket}
      />

      <FlatList
        style={{
          flex: 1,
          paddingTop: 5,
          backgroundColor: "#a2decb"
        }}
        ref={chatList}
        data={chat}
        renderItem={renderChat}
        ItemSeparatorComponent={separatorChat}
        keyExtractor={(item, index) => index.toString()}
      />

      <SendMessage
        myID={navigation.getParam("myID", "0")}
        textChat={textChat}
        handleMessage={handleMessage}
        sendingMessage={sendingMessage}
        editableText={editableText}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1
  },
  Chats: {
    borderRadius: 10,
    width: "auto",
    maxWidth: "75%",
    paddingHorizontal: 5,
    paddingVertical: 5,
    shadowColor: "green",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 10
  },
  MyText: {
    backgroundColor: "#a0b9e8",
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: "3%"
  },
  YourText: {
    backgroundColor: "white",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: "3%"
  },
  Separator: {
    marginTop: "2%"
  }
});

export default Chat;
