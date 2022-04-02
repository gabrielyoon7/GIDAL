import { useEffect, useState } from 'react';
import { FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text>{item.date}</Text>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
);
  

const DiaryListView = (props) =>{
    const items = [
        { id:"1",  title: 'item 1 - any js object', date: '2022-04-22' },
        { id:"2",  title: 'item 2 - any js object', date: '2022-04-23' },
        { id:"3",  title: 'no name', date: '2022-04-23' },
        { id:"4",  title: 'item 3 - any js object', date: '2022-04-24' },
        { id:"5",  title: 'item 1 - any js object', date: '2022-04-25' },
        { id:"6",  title: 'item 2 - any js object', date: '2022-04-26' },
        { id:"7",  title: 'no name', date: '2022-04-26' },
        { id:"8",  title: 'item 3 - any js object', date: '2022-04-27' }
    ]
    const [data, setData] = useState(0);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const index = items.findIndex((item, idx) => {
            return item.date === props.selectedDate
        })
        setData(index);
    })

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
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
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
                initialScrollIndex ={data}
            />
        </View>
    )
}
export default DiaryListView;

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        backgroundColor: '#fff',
        alignItems: 'center',
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
  