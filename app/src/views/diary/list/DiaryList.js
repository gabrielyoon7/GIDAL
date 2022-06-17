import { useCallback, useEffect, useState } from 'react';
import { FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { config } from '../../../../config'
import FancyDiaryCard from '../../../components/diary/FancyDiaryCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { Center } from 'native-base';
import { useIsFocused } from '@react-navigation/native';

const DiaryList = (props, navigation) => {
    const user_id = props.user_Id;
    const [isLoaded, setIsLoaded] = useState(false);
    const profileImg = props.profileImg;
    const [isEmpty, setEmpty] = useState(false);
    
    // const [data, setData] = useState(0);
    const [selectedId, setSelectedId] = useState(null);
    const [ref, setRef] = useState(null);
    const isFocused = useIsFocused(); // isFoucesd Define

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const numOfCol = windowWidth > 700 ? 2 : 1;
    const diaryWidth= numOfCol>1? windowWidth*0.5*0.96 : windowWidth*0.96;

    const getItems = () => {
        let result = []
        setEmpty(false);
        axios.post(config.ip + ':5000/diariesRouter/findOwn', {
            data: {
                user_id: user_id
            }
        }).then((response) => {
            if (response.data.length > 0) {
                response.data.forEach((item) => {
                    result.push(item);
                });
            } else if (response.data.length==0){
                setEmpty(true);
            }
            props.setItems(result);
        }).catch(function (error) {
            console.log(error);
        })
    }

    //첫 렌더링에만 호출됨
    useEffect(() => {
        if (user_id !== '' && isFocused) {
            if (props.type === 'calendar') {
                props.getitems();
            } else {
                getItems();
            }
            setIsLoaded(true);
        }
    }, [isFocused, user_id]);

    useEffect(() => {
        if (props.type === 'calendar'){
            let index = props.items.findIndex((item, idx) => {
                return item.date.substr(0, 10) === props.selectedDate
            })

            // setData(index);
            if (ref === null || props.items.length < 1) {
                return;
            }
            if (index <= 0) {
                ref.scrollToIndex({ animated: true, index: 0, viewPosition: 0 });
            } else {
                ref.scrollToIndex({ animated: true, index: index, viewPosition: 0 });
            }
        }
    }, [props.selectedDate]);

    const pressCommentIcon = (item) => {
        props.navigation.navigate('DiaryComment'
            , {
                diary: item,
                user_id: user_id,
                // profileImg: profileImg,
            }
        )
    }

    const renderItem = useCallback(({ item }) => {
        return (
            <FancyDiaryCard
                item={item}
                user_id={user_id}
                profileImg={profileImg}
                followers={[]}
                pressCommentIcon={() => pressCommentIcon(item)}
                diaryWidth={diaryWidth}
                onPress={
                    () => {
                        props.navigation.push('DiaryRead', {
                            diary: item,
                            user_id: user_id,
                            profileImg: profileImg
                        })
                    }
                }
                // 해당 일기로 넘어가기 구현
                textColor="black"
            />
        );
    });

    return (
        <View style={props.items.length === 1 ? styles.container2 : styles.container}>
            {isLoaded
                ?
                props.items.length == 0
                    ?
                    <Center>
                        {
                            props.isEmpty
                                ?
                                <Text>이번 달에 작성한 일기가 없습니다.</Text>
                                : isEmpty ? 
                                <Text>작성한 일기가 없습니다.</Text> :
                                <LoadingSpinner />
                        }
                    </Center>
                    :
                    <FlatList
                        onScrollToIndexFailed={info => {
                            const wait = new Promise(resolve => setTimeout(resolve, 700));
                            wait.then(() => {
                                fListRef.current?.scrollToIndex({ index: info.index, animated: true / false });
                            });
                        }}
                        data={props.items}
                        ref={(ref) => {
                            setRef(ref);
                        }}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        numColumns={numOfCol}
                        initialNumToRender={3}
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
        alignItems: 'center',
    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
