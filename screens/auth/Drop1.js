import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Drop1 = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      if (currentPicker === 'date') {
        setDate(selectedDate);
      } else if (currentPicker === 'time') {
        setTime(selectedDate);
      }
    }
  };

  const showMode = (currentMode, pickerType) => {
    setShow(true);
    setMode(currentMode);
    setCurrentPicker(pickerType);
  };

  const showDatepicker = () => {
    showMode('date', 'date');
  };

  const showTimepicker = () => {
    showMode('time', 'time');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button onPress={showDatepicker} title="Show date picker!" />
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      <View style={styles.displayContainer}>
        <Text style={styles.label}>Selected Date: {date.toLocaleDateString()}</Text>
        <Text style={styles.label}>Selected Time: {time.toLocaleTimeString()}</Text>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={currentPicker === 'date' ? date : time}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  displayContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Drop1;