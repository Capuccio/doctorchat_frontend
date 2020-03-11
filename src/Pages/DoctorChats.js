import React, { useState, useEffect } from "react";
import { View, Text, Alert, FlatList, StyleSheet, Image } from "react-native";
import api from "../../utils/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import ChatsHeader from "../Components/ChatsHeader";

const DoctorChats = props => {
  const { navigation } = props;
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const patientsList = async () => {
      let answer = await api.patientsList(navigation.getParam("myID", "D"));

      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
      } else {
        if (isMounted) {
          setUsersList(list => answer.msg);
        }
      }
    };

    patientsList();
    return () => (isMounted = false);
  }, []);

  const moveToChat = idUser => {
    navigation.navigate("Chat", {
      myID: navigation.getParam("myID", "0"),
      level: navigation.getParam("level", "2"),
      idUser
    });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => moveToChat(item._id)}
        style={styles.List}
      >
        <View style={styles.ProfileContainer}>
          <Image
            source={{ uri: item.profilePicture }}
            style={styles.ProfilePicture}
          />
        </View>
        <View>
          <Text>
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
      <ChatsHeader
        navigation={navigation}
        myID={navigation.getParam("myID", "0")}
      />

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
