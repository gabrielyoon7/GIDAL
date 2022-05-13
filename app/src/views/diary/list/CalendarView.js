import { useState } from 'react';
import { Text, View } from "native-base"
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const CalendarView = ( props ) => {
    // const [markedDates, setMarkedDates] = useState({
    //     [props.selectedDate]: {
    //         selected: true,
    //         disableTouchEvent: true,
    //         selectedColor: 'yellowgreen',
    //         // selectedTextColor: '#7954FA',
    //     },
    // })

    const changeDate = (date) => {
        props.setSelectedDate(date.dateString);
    }
    return (
        <View style={{ height: 310 }}>
        {/* <View style={{ flex: 0.7 }}> */}
            <Calendar
                onDayPress={(date) => changeDate(date)}
                markedDates={props.markedDates}
            />
            {/* <Agenda /> */}
        </View>
    );
}

export default CalendarView;