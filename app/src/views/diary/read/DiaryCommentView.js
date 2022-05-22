import { Box, Button, Image, Input } from "native-base";
import { Dimensions, FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from 'axios';
import { config } from '../../../../config'
import { useNavigationState } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

const DiaryCommentView = (props) => {
    const [userId, setUserId] = useState('');
    const [inputComment, setInputComment] = useState('');
    const new_routes = useNavigationState(state => state.routes);
    const defaultData = {
        "__v": 0,
        "_id": "626f78c19ee18cdc829a10de",
        "accessible_user": [],
        "comments": [],
        "content": "loading...",
        "date": "2022-05-02T00:00:00.000Z",
        "disclosure": "private",
        "likes": 0,
        "stickers": [],
        "tags": [],
        "likers": [],
        "title": "loading...",
        "user_id": "loading...",
    };
    const [diary, setDiary] = useState(defaultData);

    useEffect(() => {
        //초기 일기 수신부
        try {
            const idx = new_routes.findIndex(r => r.name === "DiaryComment")
            const diary = new_routes[idx].params.diary;
            const user_id = new_routes[idx].params.user_id;
            console.log(diary)
            console.log(user_id)
            setDiary(diary);
            setUserId(user_id)
        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleClick = () => {
        axios.post(config.ip + ':5000/diariesRouter/modifyComment', {
            data: {
                id: diary._id,
                user_id: userId,
                comment: inputComment
            }
        }).then((response) => {
            console.log(2);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const CommentHeader = () => {
        return (
            <Box style={styles.headerBar} justifyContent="center" display="flex">
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, flexDirection: 'row', paddingLeft: 10 }} >
                    <AntDesign style={styles.allowIcon} name="left" size={24} color="black" />
                </TouchableOpacity>
            </Box>
        );
    }

    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );

    const renderItem = ({ item }) => (
        <Item user_id={item.title} />
      );

    const CommentView = () => {
        return (
            <>
                {/* <KeyboardAvoidingView
                    style={{ backgroundColor: '#FFFFFF' }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                > */}
                    <View>
                        {/* <FlatList
                            data={diary.comments}
                            renderItem={renderItem}
                            keyExtractor={item => item._id} >
                            
                        </FlatList> */}
                        <Input
                            // style={styles.input}
                            // style={{ margin: 12, borderWidth: 1, borderColor: 'gray' }}
                            onChangeText={(value) => setInputComment(value)}
                            value={inputComment}
                            InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick} >
                                {/* {show ? "Hide" : "Show"} */}
                                {"show"}
                            </Button>}
                        />
                    </View>
                {/* </KeyboardAvoidingView> */}
            </>
        )
    }

    return (
        <ParallaxScrollView
            style={{ flex: 1 }}
            backgroundColor="white"
            parallaxHeaderHeight={windowHeight * 0.3}
            renderFixedHeader={() => <CommentHeader />}
        >
            <CommentView />
        </ParallaxScrollView>
    )
}
export default DiaryCommentView;

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    background: {
        backgroundColor: "white",
        // flex:1,
        minHeight: windowHeight - 49,
        // flex:1,
        // justifyContent: 'center',
    },
    header: {
        height: windowHeight * 0.4,
        // backgroundColor: "black",
        // textAlign: "center",
        // justifyContent: 'center',
        // color: "white",
    },
    scroll: {
        flex: 1.0,
    },
    button: {
        flex: 0.5,
        marginLeft: 20,

    },
    source: {
        minHeight: windowHeight * 0.4,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 16,
        // backgroundColor: 'black'
    },
    headerBar: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 16,
        backgroundColor: 'white',
        paddingVertical: 10,
    },
})