import * as React from 'react';
import CalendarView from './CalendarView';
import DiaryList from './DiaryList';
import { Fab, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';


const DiaryListView = (props) => {
    const [date, setSelectedDate] = React.useState(props.selectedDate);
    const [user_Id, setUserId] = React.useState('');
    console.log(user_Id);

    React.useEffect(() => {
        try {
            AsyncStorage.getItem('userInfo')
                .then(value => {
                    if (value != null) {
                        const UserInfo = JSON.parse(value);
                        setUserId(UserInfo[0].user_id);
                    }
                }
                )
        } catch (error) {
            console.log(error);
        }
    })

    return (
        <>
            <CalendarView selectedDate={date} setSelectedDate={setSelectedDate} />
            <DiaryList selectedDate={date} navigation={props.navigation} user_Id={user_Id} />
            <Fab
                renderInPortal={false}
                shadow={2}
                size="md"
                style={{backgroundColor:"#27ae60", }}
                icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
                onPress={() => props.navigation.navigate('DiaryWrite', { selectedDate: date, user_Id: user_Id })}
            />
        </>
    )
}

export default DiaryListView;