import * as React from 'react';
import CalendarView from './CalendarView';
import DiaryList from './DiaryList';
import { Fab, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';


const DiaryListView = (props) => {
    const [date, setSelectedDate] = React.useState(props.selectedDate);    
    const [user_Id, setUserId] = React.useState('');

    React.useEffect(() => {
        // getData();
        try {
            AsyncStorage.getItem('userInfo')
                .then(value => {
                    if (value != null) {
                        const UserInfo = JSON.parse(value);
                        setUserId(UserInfo.user_id);
                    }
                }
                )
        } catch (error) {
            console.log(error);
        }
    })

    const getData = () => {
        try {
            AsyncStorage.getItem('userInfo')
                .then(value => {
                    if (value != null) {
                        const UserInfo = JSON.parse(value);
                        setUserId(UserInfo.user_id);
                        // console.log(user_Id);
                    }
                }
                )
        } catch (error) {
            console.log(error);
        }
    }

    // React.useEffect(() => {
    //     console.log(user_Id);
    // }, [user_Id])
    
    return (
        <>
            <CalendarView selectedDate={date} setSelectedDate={setSelectedDate} />
            <DiaryList selectedDate={date} navigation={props.navigation} user_Id={user_Id} />
            <Fab
             renderInPortal={false} 
             shadow={2} 
             size="md" 
             icon={<Icon color="white" as={AntDesign} name="plus" size="md" />} 
             onPress={() => props.navigation.navigate('DiaryWrite', {selectedDate: date, user_Id: user_Id})}
            />
        </>
    )
}

export default DiaryListView;