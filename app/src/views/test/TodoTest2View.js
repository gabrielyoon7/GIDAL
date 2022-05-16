import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { Button, View, Text, SafeAreaView, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import { Spacer } from 'native-base';
import axios from 'axios';
import { config } from '../../../config'
import BackButton from '../../components/common/BackButton';
import { useIsFocused } from '@react-navigation/native';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import FancyTodoCard from '../../components/todo/FancyTodoCard';

// const DATA = [
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       title: 'First Item',
//     },
//     {
//       id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//       title: 'Second Item',
//     },
//     {
//       id: '58694a0f-3da1-471f-bd96-145571e29d72',
//       title: 'Third Item',
//     },
//   ];
  
//   const Item = ({ title }) => (
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   );

const TodoTest2View = (props) => {
    // console.log(props.pickedDate);
    const user_id = props.user_id;
    const pickedDate = props.pickedDate;
    const isFocused = useIsFocused();
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
      }, [user_id, isFocused]);

    const getItems = () => {
        let result = []
        axios.post(config.ip + ':5000/todoRouter/findOwn', {
            data: {
                user_id: user_id
            }
        }).then((response) => {
            // if (response.data.length > 0) {
            //     response.data.forEach((item) => {
            //         result.push(item);
            //     });
            // }
            setItems(response.data[0].to_do_list);
            setIsLoaded(true)
        }).catch(function (error) {
            console.log(error);
        })
    }
// console.log(items);
    const [data, setData] = useState(0);
    const [ref, setRef] = useState(null);

    useEffect(() => {
        let index = items.findIndex((item, idx) => {
            return item.date.substr(0, 10) === pickedDate
        })

        setData(index);
        if (ref === null || items.length < 1) {
            return;
        }
        if (index <= 0) {
            ref.scrollToIndex({ animated: true, index: 0, viewPosition: 0 });
        } else {
            ref.scrollToIndex({ animated: true, index: index, viewPosition: 0 });
        }
    }, []);
    
    const renderItem = ({ item }) => (
        <FancyTodoCard
                item={item}
                // 해당 일기로 넘어가기 구현
                textColor="black"
            />
      );

        return (
            <>
                    {/* <Calendar
                        markedDates={markedDates}
                    /> */}
                    <View style={styles.container}>
                    <BackButton navigation={props.navigation} />
                    <Spacer />
                    {isLoaded
                    ?
                    <FlatList
                        onScrollToIndexFailed={info => {
                        const wait = new Promise(resolve => setTimeout(resolve, 700));
                        wait.then(() => {
                            fListRef.current?.scrollToIndex({ index: info.index, animated: true / false });
                        });
                    }}
                    data={items}
                    ref={(ref) => {
                        setRef(ref);
                    }}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    />
                    :
                    <LoadingSpinner />
                    }
        </View>
            </>
         )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TodoTest2View;