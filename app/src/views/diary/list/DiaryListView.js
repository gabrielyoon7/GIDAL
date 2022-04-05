import * as React from 'react';
import CalendarView from './CalendarView';
import DiaryList from './DiaryList';
import { Fab, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";


const DiaryListView = (props) => {
    const [date, setSelectedDate] = React.useState(props.selectedDate);    
    
    return (
        <>
            <CalendarView selectedDate={date} setSelectedDate={setSelectedDate} />
            <DiaryList selectedDate={date} navigation={props.navigation} />
            <Fab renderInPortal={false} shadow={2} size="md" 
                icon={<Icon color="white" as={AntDesign} name="plus" size="md" />} 
                onPress={() => props.navigation.navigate('DiaryWrite', {selectedDate: date})}
                // 다이어리 쓰기 페이지로 넘어가기 (스택을 어디에 추가해야할 지 모르겠음)
            />
        </>
    )
}

export default DiaryListView;