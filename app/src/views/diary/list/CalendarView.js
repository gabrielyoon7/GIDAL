import { useEffect, useState } from 'react';
import { Text, View } from "native-base"
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const CalendarView = ( props ) => {
    const [month, setMonth] = useState(props.date);
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

    const monthChanged = (date) => {
        // console.log('month changed', date);
        props.setSelectedDate(date.dateString);
        setMonth(date.month);
    }

    useEffect(() => {
        props.getitems();
    },[month]);

    return (
        <View style={{ height: 310 }}>
        {/* <View style={{ flex: 0.7 }}> */}
            <Calendar
                onDayPress={(date) => changeDate(date)}
                markedDates={props.markedDates}
                monthFormat={'yyyy년 MM월'}
                onMonthChange={(month) => monthChanged(month)}
            />
            {/* <Agenda /> */}
        </View>
    );
}

export default CalendarView;