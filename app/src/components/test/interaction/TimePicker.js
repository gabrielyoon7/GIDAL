import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePicker = () => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [time, setTime] = useState('');

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (pickedTime) => {
    setTime(pickedTime.toString());
    hideTimePicker();
  };

  return (
    <View>
      <Button title="Show Time Picker" onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
      <Text>{time}</Text>
    </View>
  );
};

export default TimePicker;