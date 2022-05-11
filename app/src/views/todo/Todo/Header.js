import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Header({date}) {
  // const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  return (
    <ComponentContainer>
      <HeaderText>To-Do</HeaderText>
      <HeaderList>{date}</HeaderList>
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
  ${'' /* color: white; */}
  font-size: 30px;
`;

const HeaderList = styled.Text`
  ${'' /* color: white; */}
  font-size: 20px;
  margin-right: 20px;
`;