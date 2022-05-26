import * as React from 'react';
import CalendarView from './CalendarView';
import DiaryList from './DiaryList';
import { Fab, Icon, useToast } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { config } from '../../../../config'


const DiaryListView = (props) => {
    const [date, setSelectedDate] = React.useState(props.selectedDate);
    const [markedDates, setMarkedDates] = React.useState({
        [props.selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'yellowgreen',
            // selectedTextColor: '#7954FA',
        },
    })
    const [items, setItems] = React.useState([]);
    const [user_Id, setUserId] = React.useState('');
    // console.log(user_Id);

    const getitems = () => {
        let result = []
        const year = date.split('-')[0]
        const month = date.split('-')[1]
        axios.post(config.ip + ':5000/diariesRouter/findOwnPerMonth', {
            data: {
                user_id: user_Id,
                year: year,
                month: month
            }
        }).then((response) => {
            if (response.data.length > 0) {
                response.data.forEach((item) => {
                    result.push(item);
                });
            }
            setItems(result);
            // console.log(result);
        }).catch(function (error) {
            console.log(error);
        })
    }

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

    React.useEffect(() => {
        let val = {};
        let isSelected = false;
        items.forEach(item => {
            const itemDate = item.date.split('T')[0]
            if(itemDate === date){
                val[itemDate] = {marked: true, selected: true,disableTouchEvent: true,selectedColor: 'yellowgreen',}
                isSelected = true
            }
            else {
                val[itemDate] = {marked: true}
            }
        });
        if(!isSelected){
            val[date] = ({selected: true, disableTouchEvent: true, selectedColor: 'yellowgreen'})
 
        }
        setMarkedDates(val)
    },[items, date])

    const toast = useToast();
    const id = "diary-write-toast";

    const handleWriteButton = () => {
        props.navigation.navigate('DiaryWrite', { selectedDate: date, user_Id: user_Id })
        if (!toast.isActive(id)) {
            toast.show({
              id,
              title: "작성하시는 일기는 선택 일자인 "+date+"에 저장됩니다."
            });
        }
    }

    return (
        <>
            <CalendarView selectedDate={date} setSelectedDate={setSelectedDate} markedDates={markedDates} getitems={getitems} />
            <DiaryList selectedDate={date} navigation={props.navigation} user_Id={user_Id} items={items} getitems={getitems} type={'calendar'} />
            <Fab
                renderInPortal={false}
                shadow={2}
                size="md"
                style={{backgroundColor:"#27ae60", }}
                icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
                onPress={handleWriteButton}
            />
        </>
    )
}

export default DiaryListView;