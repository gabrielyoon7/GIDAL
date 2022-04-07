import { useEffect, useState } from 'react';
import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { config } from '../../../../config'

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text>{item.date}</Text>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
        <Text>{item.content}</Text>
    </TouchableOpacity>
);

{/**

제 생각엔 위의 Item의 TouchableOpacity 부분은 components 폴더로 모듈화 시켜서 다이어리 메인과 피드 등 여러 곳에서 사용할 수 있도록 하는게 좋을 것 같습니다.

*/}


const FeedView = (props) => {
    const [items, setItems] = useState([]);
    const user_id = '202212069';
    let num = 0;

    const getitems = () => {
        let result = []
        // if(items.length > 0){
        //     return;
        // }
        if (num > 0) {
            return;
        }
        axios.post(config.ip + ':5000/diariesRouter/findOwn', {
            data: {
                user_id: user_id
            }
        }).then((response) => {
            num++;
            console.log(response.data);
            if (response.data.length < 1) {
                return;
            }
            response.data.forEach((item) => {
                const diary = { id: item._id, date: item.date, title: item.title, content: item.content }
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
    }, []);

    useEffect(() => {
        const index = items.findIndex((item, idx) => {
            return item.date === props.selectedDate
        })
        setData(index);
        if (ref === null || index < 1) {
            return;
        }
        ref.scrollToIndex({ animated: true, index: 0, viewPosition: 0 });
        if (index > 0) {
            ref.scrollToIndex({ animated: true, index: index, viewPosition: 0 });
        }
    })

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                // onPress={() => setSelectedId(item.id)}
                onPress={() => props.navigation.navigate('DiaryRead')}
                // 해당 일기로 넘어가기 구현
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <>
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
            <Button
                title="프로필 페이지로 가기(임시)"
                onPress={() => props.navigation.navigate('Profile')}
            />
            <Text> </Text>
            <Button
                title="일기 검색하기(임시)"
                onPress={() => props.navigation.navigate('FeedSearch')}
            />
        </>
    )
}
export default FeedView;

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
