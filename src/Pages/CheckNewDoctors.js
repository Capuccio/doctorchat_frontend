import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import CheckNewDoctorsHeader from "../Components/NewDoctorsHeader";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import api from "../../utils/api";

const CheckNewDoctors = props => {
  const [newDoctorList, setNewDoctorList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getNewDoctorList = async () => {
      let answer = await api.getDoctorList(2);

      if (answer.error) {
        Alert.alert(answer.title, answer.msg);
      } else {
        if (isMounted) {
          setNewDoctorList(answer.msg);
        }
      }
    };

    getNewDoctorList();
    return () => (isMounted = false);
  }, []);

  const handleRequest = async (idDoctor, option) => {
    let answer = await api.acceptDoctor({ idDoctor, option });

    if (!answer.error) {
      let doctorListArray = [...newDoctorList];

      for (let i = 0; i < newDoctorList.length; i++) {
        if (doctorListArray[i]._id === idDoctor) {
          doctorListArray.splice(i, 1);
        }
      }

      setNewDoctorList(doctorListArray);
    }

    Alert.alert(answer.title, answer.msg);
  };

  const acceptDoctor = async (name, lastname, idDoctor) => {
    Alert.alert(
      "¿Que desea hacer?",
      `Por favor decidir sí Doctor ${name} ${lastname} podrá ejercer en la aplicación`,
      [
        { text: "Cancelar" },
        {
          text: "Rechazar",
          onPress: () => {
            handleRequest(idDoctor, 0);
          }
        },
        {
          text: "Aceptar",
          onPress: () => {
            handleRequest(idDoctor, 1);
          }
        }
      ]
    );
  };

  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.List}
        onPress={() => acceptDoctor(item.name, item.lastname, item._id)}
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

  const emptyList = () => {
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
          No hay nuevos doctores registrados
        </Text>
      </View>
    );
  };

  return (
    <View>
      <CheckNewDoctorsHeader navigation={props.navigation} />

      <FlatList
        data={newDoctorList}
        renderItem={renderList}
        ListEmptyComponent={emptyList}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default CheckNewDoctors;
