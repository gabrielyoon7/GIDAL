import { useEffect, useState } from 'react';
import { FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { config } from '../../../../config'
import FancyDiaryCard from '../../../components/diary/FancyDiaryCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';


const DiaryList = (props, navigation) => {
    const [items, setItems] = useState([]);
    const user_id = props.user_Id;
    const isFocused = useIsFocused(); // isFoucesd Define
    const [isLoaded, setIsLoaded] = useState(false);
    const getitems = () => {
        let result = []
        axios.post(config.ip + ':5000/diariesRouter/findOwn', {
            data: {
                user_id: user_id
            }
        }).then((response) => {
            if (response.data.length > 0) {
                response.data.forEach((item) => {
                    result.push(item);
                });
            }
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
        setIsLoaded(true);
    }, [isFocused, user_id]);

    useEffect(() => {
        let index = items.findIndex((item, idx) => {
            return item.date.substr(0, 10) === props.selectedDate
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

    const renderItem = ({ item }) => {
        return (
            <FancyDiaryCard
                item={item}
                onPress={
                    () => {
                        props.navigation.navigate('DiaryRead', {
                            diary: item,
                        })
                    }
                }
                // 해당 일기로 넘어가기 구현
                textColor="black"
            />
        );
    };

    return (
        <View style={styles.container}>
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
                // extraData={selectedId}
                />
                :
                <LoadingSpinner />
            }
        </View>
    )
}
export default DiaryList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
});
