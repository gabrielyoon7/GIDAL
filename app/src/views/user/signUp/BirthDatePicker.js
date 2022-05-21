import React, { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, HStack, Text } from "native-base";
import Icon from 'react-native-vector-icons/AntDesign';

const BirthDayPicker = ({setBirth}) => {
    const placeholder = "날짜를 입력해주세요";
    const [text, onChangeText] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let birthDay = date.toJSON().split('T')[0]
        onChangeText(birthDay)
        setBirth(birthDay)
        hideDatePicker();
    };

    return(
        <View my={1}>
            <HStack>
            <Text mr={1}>{text}</Text>
            <Icon name="calendar" size={30} color="green" onPress={() => showDatePicker()}/>
            </HStack>   
            <DateTimePickerModal
            headerTextIOS={placeholder}
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        </View>	
    )
}

export default BirthDayPicker