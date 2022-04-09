import { useState } from 'react';
import { Text, View } from "native-base"
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const CalendarView = ( props ) => {

    const changeDate = (date) => {
        props.setSelectedDate(date.dateString);
    }
    return (
        <View style={{ height: 310 }}>
        {/* <View style={{ flex: 0.7 }}> */}
            <Calendar
                onDayPress={(date) => changeDate(date)}
                markedDates={{
                    [props.selectedDate]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedColor: '#F1EFFE',
                        selectedTextColor: '#7954FA',
                    },
                }}
            />
            {/* <Agenda /> */}
        </View>
    );
}

export default CalendarView;