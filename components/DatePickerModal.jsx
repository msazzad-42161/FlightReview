import { SPACING } from '@/const/const';
import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, Pressable } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';

const DatePickerModal = ({ date, setDate, visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose} style={styles.modalBackground}>
        <View style={styles.modalContainer} onStartShouldSetResponder={() => true}>
          <DateTimePicker
            mode="single"
            date={date}
            onChange={(params) => setDate(params.date)}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default DatePickerModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: SPACING.md,
    padding: SPACING.lg,
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
  },
});
