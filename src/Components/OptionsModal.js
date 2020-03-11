import React from "react";
import { StyleSheet, Text, View, Modal } from "react-native";

const OptionsModal = ({
  level,
  modalOptionsVisible,
  modalOptionsOpenClose,
  closeSession,
  blockPatient,
  unlockPatient,
  moveToSettings
}) => {
  return (
    <Modal
      visible={modalOptionsVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.ModalContainer}>
        <View style={styles.Options}>
          {level === 2 ? (
            <View>
              <Text style={styles.Option} onPress={blockPatient}>
                Bloquear Paciente
              </Text>
              <Text style={styles.Option} onPress={unlockPatient}>
                Desbloquear Paciente
              </Text>
              <Text style={styles.Option} onPress={modalOptionsOpenClose}>
                Cerrar
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.Option} onPress={moveToSettings}>
                Configuración
              </Text>
              <Text style={styles.Option} onPress={closeSession}>
                Cerrar sesión
              </Text>
              <Text style={styles.Option} onPress={modalOptionsOpenClose}>
                Cerrar
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalContainer: {
    backgroundColor: "rgba(0, 0, 0, .60)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  Options: {
    backgroundColor: "rgba(245, 245, 245, 1)",
    borderRadius: 4
  },
  Option: {
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, .4)",
    paddingVertical: 10,
    paddingHorizontal: 60,
    textAlign: "center"
  }
});

export default OptionsModal;
