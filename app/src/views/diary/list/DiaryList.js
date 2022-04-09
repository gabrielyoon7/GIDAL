import { useEffect, useState } from 'react';
import { FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import {config} from '../../../../config'

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text>{item.date}</Text>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
        <Text>{item.content}</Text>
    </TouchableOpacity>
);
  

const DiaryListView = (props, navigation) =>{
    const [items, setItems] = useState([]);
    const user_id = '202212069';
    const isFocused = useIsFocused(); // isFoucesd Define

    const getitems = () => {
        let result = []
        axios.post(config.ip + ':5000/diariesRouter/findOwn',{
            data: {
                user_id: user_id
            }
        }).then((response) => {
            // console.log(response.data);
            if (response.data.length < 1){
                return;
            }
            response.data.forEach((item) => {
                const diary = {id: item._id, date: item.date, title: item.title, content: item.content}
                result.push(diary);
            });
            setItems(result);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const [data, setData] = useState(0);
    const [selectedId, setSelectedId] = useState(null);
    const [ref, setRef] = useState(null);    

    //첫 렌더링에만 호출됨
    useEffect(() => {
        getitems();
    }, [isFocused]);

    useEffect(() => {
        let index = items.findIndex((item, idx) => {
            return item.date.substr(0,10) === props.selectedDate
        })

        setData(index);
        if(ref === null || items.length < 1) {
            return;
        }
        if(index <= 0){
            ref.scrollToIndex({animated: true, index: 0, viewPosition: 0});
        } else {
            ref.scrollToIndex({animated: true, index: index, viewPosition: 0});
        }
    })

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                // onPress={() => setSelectedId(item.id)}
                onPress={
                    () => {
                        props.navigation.navigate('DiaryRead', {
                            itemId: item.id, 
                            title: item.title, 
                            content:item.content
                        })
                    }                
                }
                // 해당 일기로 넘어가기 구현
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                ref={(ref) => {
                    setRef(ref);
                }}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
                // initialScrollIndex ={data}
            />
        </View>
    )
}
export default DiaryListView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
  