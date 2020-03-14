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
  Clipboard
} from "react-native";
import { Notifications } from "expo";
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
  const receiveChat = useRef(null);
  const chatList = useRef(null);

  useEffect(() => {
    let isMounted = true;
    receiveChat.current = true;

    if (!socket.connected) {
      socket.open();
    }

    const getChat = async () => {
      let level = navigation.getParam("level", "1");
      let idPatient =
        level === 2
          ? navigation.getParam("idUser", "0")
          : navigation.getParam("myID", "0");

      let answer = await api.getChat(idPatient);

      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
        return;
      }

      if (answer.msg === null) {
        if (isMounted) {
          setChat([]);
        }
      } else {
        if (isMounted) {
          setChat(answer.msg);
        }
      }

      if (isMounted) {
        setPatientData(idPatient);
      }

      setTimeout(() => {
        chatList.current.scrollToEnd();
      }, 600);

      socket.emit("joinRoom", idPatient);
      if (isMounted) {
        setEditableText(true);
      }
    };

    getChat();

    return () => {
      isMounted = false;
      receiveChat.current = false;
    };
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
    if (receiveChat.current) {
      setChat(arrayChat);
    }

    newMessage.idPatient = patientData;
    newMessage.otherPerson = navigation.getParam("idUser", 0);

    socket.emit("newMessage", newMessage);
  };

  socket.on("received", async msg => {
    let arrayChat = [...chat];
    arrayChat.push(msg);
    if (receiveChat.current) {
      setChat(arrayChat);
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
        myID={navigation.getParam("myID", "0")}
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
