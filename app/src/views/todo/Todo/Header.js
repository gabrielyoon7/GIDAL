import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Header({date}) {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log(date);
    setPickedDate(date.toJSON().split('T')[0])
    hideDatePicker();
  };

  return (
    <ComponentContainer>
      <HeaderText>To-Do</HeaderText>
      <TouchableOpacity onPress={() => showDatePicker()} >
        <HeaderList>{date}</HeaderList>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 30px;
`;

const HeaderList = styled.Text`
  color: white;
  font-size: 20px;
  margin-right: 20px;
`;