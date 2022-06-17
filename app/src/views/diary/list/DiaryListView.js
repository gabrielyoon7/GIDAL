import * as React from 'react';
import CalendarView from './CalendarView';
import DiaryList from './DiaryList';
import { Fab, Icon, useToast } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { config } from '../../../../config'
import { useIsFocused } from '@react-navigation/native';

const DiaryListView = (props) => {
    const isFocused = useIsFocused(); // isFoucesd Define
    const [date, setSelectedDate] = React.useState(props.selectedDate);
    const [preDate, setPreSelectedDate] = React.useState(props.selectedDate);
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
    const [profileImg, setProfileImg] = React.useState('');

    const [isEmpty, setEmpty] = React.useState(false);

    React.useEffect(() => {
        if(isFocused){
            try {
                AsyncStorage.getItem('userInfo')
                    .then(value => {
                        if (value != null) {
                            const UserInfo = JSON.parse(value);
                            setUserId(UserInfo[0].user_id);
                            setProfileImg(UserInfo[0].profile_image);
                        }
                    }
                    )
            } catch (error) {
                console.log(error);
            }
        }
    }, [isFocused])

    React.useEffect(() => {
        if(items.length !== 0){
            setItemData()
        }
    }, [items])

    React.useEffect(() => {
        if(preDate.split('-')[1] !== date.split('-')[1]){
            setPreSelectedDate(date);
        }
        else {
            const selectItem = markedDates[date]
            const preSelectItem = markedDates[preDate]
            const nextItems = markedDates
            const nextItem = {
                ...selectItem,
                selected: true, disableTouchEvent: true, selectedColor: 'yellowgreen'
            }
            const preItem = {
                ...preSelectItem,
                selected: false, disableTouchEvent: false, selectedColor: 'none'
            }
            nextItems[date]=nextItem
            nextItems[preDate]=preItem
            setPreSelectedDate(date);
            setMarkedDates(nextItems);
        }
    }, [date])

    const setItemData = () => {
        let val = {};
        let isSelected = false;
        items.forEach(item => {
            const itemDate = item.date.split('T')[0]
            if (itemDate === date) {
                val[itemDate] = { marked: true, selected: true, disableTouchEvent: true, selectedColor: 'yellowgreen', }
                isSelected = true
            }
            else {
                val[itemDate] = { marked: true }
            }
        });
        if (!isSelected) {
            val[date] = ({ selected: true, disableTouchEvent: true, selectedColor: 'yellowgreen' })

        }
        setMarkedDates(val)
    }

    const changeDate = (date) => {
        setSelectedDate(date);
    }

    const getitems = () => {
        const year = date.split('-')[0]
        const month = date.split('-')[1]
        setEmpty(false);
        setItems([]);
        axios.post(config.ip + ':5000/diariesRouter/findOwnPerMonth', {
            data: {
                user_id: user_Id,
                year: year,
                month: month
            }
        }).then((response) => {
            setItems(response.data);
            if(response.data.length==0){
                setEmpty(true);
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    const toast = useToast();
    const id = "diary-write-toast";

    const handleWriteButton = () => {
        props.navigation.navigate('DiaryWrite', { selectedDate: date, user_Id: user_Id })
        if (!toast.isActive(id)) {
            toast.show({
                id,
                title: "작성하시는 일기는 선택 일자인 " + date + "에 저장됩니다."
            });
        }
    }
    return (
        <>
            <CalendarView
             selectedDate={date}
             setSelectedDate={changeDate} 
             markedDates={markedDates} 
             getitems={getitems} 
             items={items}
            />
            <DiaryList
             selectedDate={date} 
             navigation={props.navigation} 
             user_Id={user_Id} 
             items={items} 
             getitems={getitems} 
             type={'calendar'} 
             profileImg={profileImg} 
             isEmpty={isEmpty}
            />
            <Fab
                renderInPortal={false}
                shadow={2}
                size="md"
                style={{ backgroundColor: "#27ae60", }}
                icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
                onPress={handleWriteButton}
            />
        </>
    )
}

export default DiaryListView;