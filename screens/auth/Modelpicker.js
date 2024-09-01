import React from 'react';
import { Modal, TouchableOpacity, Text, FlatList, StyleSheet, View } from 'react-native';

const ModalPicker = ({ visible, options, onSelect, onClose }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.option} onPress={() => onSelect(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    maxHeight: '80%',
    width: '80%',
  },
  list: {
    // marginBottom: 20,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B48CEF',
  },
  closeButton: {
    backgroundColor: '#B48CEF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
  },
});

export default ModalPicker;