import React, { useState, useEffect } from "react";
import { View, Text, Alert, FlatList, StyleSheet, Image } from "react-native";
import api from "../../utils/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import ChatsHeader from "../Components/ChatsHeader";

const DoctorChats = props => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const userList = async () => {
      let answer = await api.userList();

      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
      } else {
        setUsersList(list => answer.msg);
      }
    };

    userList();
  }, []);

  const moveToChat = idUser => {
    props.navigation.navigate("Chat", {
      myID: props.navigation.getParam("myID", "0"),
      level: props.navigation.getParam("level", "2"),
      idUser
    });
  };

  const renderItem = ({ item }) => {
    let unknow_picture =
      item.genre == "M"
        ? "https://i.imgur.com/ihhfBI4.jpg"
        : "https://i.imgur.com/u3fYPb8.jpg";

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => moveToChat(item._id)}
        style={styles.List}
      >
        <View style={styles.ProfileContainer}>
          {item.profilePicture != null ? (
            <Image
              source={{ uri: item.profilePicture }}
              style={styles.ProfilePicture}
            />
          ) : (
            <Image
              source={{ uri: unknow_picture }}
              style={styles.ProfilePicture}
            />
          )}
        </View>
        <View>
          <Text style={styles.PatientName}>
            {item.name} {item.lastname}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const emptyUserList = () => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderStyle: "dashed",
          borderRadius: 2,
          marginVertical: 10,
          marginHorizontal: 10,
          paddingVertical: 15
        }}
      >
        <Text style={{ textAlign: "center", color: "gray" }}>
          No tiene pacientes registrados
        </Text>
      </View>
    );
  };

  return (
    <View>
      <ChatsHeader />
      <FlatList
        style={styles.ListContainer}
        data={usersList}
        ListEmptyComponent={emptyUserList}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ListContainer: {
    marginTop: 0
  },
  List: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    borderTopWidth: 1,
    borderColor: "#3bd1c5"
  },
  ProfileContainer: {
    marginLeft: 4,
    marginRight: 10
  },
  ProfilePicture: {
    width: 68,
    height: 68,
    borderRadius: 60
  }
});

export default DoctorChats;
