import { useEffect, useState } from 'react';
import { Text, View } from "native-base"
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useToast } from 'native-base';

const CalendarView = (props) => {
    const toast = useToast();
    const id = "calender-select-toast";
    const [changeMonth, setChangeMonth] = useState(false);

    useEffect(() => {
        if(changeMonth){
            props.getitems();
            setChangeMonth(false);
        }
    }, [changeMonth]);

    const changeDate = (date) => {
        props.setSelectedDate(date.dateString);
        if (!toast.isActive(id)) {
            toast.show({
              id,
              title: "선택 된 날짜로 이동합니다."
            });
        }
    }

    const monthChanged = (date) => {
        props.setSelectedDate(date.dateString);
        setChangeMonth(true);
    }

    return (
        <View style={{ height: 310 }}>
            <Calendar
                onDayPress={(date) => changeDate(date)}
                markedDates={props.markedDates}
                monthFormat={'yyyy년 MM월'}
                onMonthChange={(month) => monthChanged(month)}
                enableSwipeMonths={true}
            />
        </View>
    );
}

export default CalendarView;