import { Box, Button, Image, Input, ScrollView } from "native-base";
import { Dimensions, FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from 'axios';
import { config } from '../../../../config'
import { useNavigationState } from '@react-navigation/native';
import FancyCommentCard from "../../../components/diary/FancyCommentCard";
import SearchBar from "react-native-dynamic-search-bar";
import InputComment from "./InputComment";

const windowHeight = Dimensions.get('window').height;

const DiaryCommentView = (props) => {
    const [userId, setUserId] = useState('');
    const [profileImg, setProfileImg] = useState('');
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
    const [comments, setComments] = useState(defaultData.comments);

    useEffect(() => {
        //초기 일기 수신부
        try {
            const idx = new_routes.findIndex(r => r.name === "DiaryComment")
            const diary = new_routes[idx].params.diary;
            const user_id = new_routes[idx].params.user_id;
            const profile_image = new_routes[idx].params.profileImg;

            setDiary(diary);
            setUserId(user_id);
            setProfileImg(profile_image);
            setComments(diary.comments)
        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleClick = (value) => {
        axios.post(config.ip + ':5000/diariesRouter/modifyComment', {
            data: {
                id: diary._id,
                user_id: userId,
                comment: value
            }
        }).then((response) => {
            setInputComment('');
            getItem();
        }).catch(function (error) {
            console.log(error);
        })
    }

    const getItem = () => {
        axios.post(config.ip + ':5000/diariesRouter/findOne', {
            id: diary._id,
        }).then((response) => {
            console.log(response.data)
            setComments(response.data.comments);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const deleteComment = (id) => {
        axios.post(config.ip + ':5000/diariesRouter/deleteComment', {
            data: {
                id: diary._id,
                comment_id: id
            }
        }).then((response) => {
            console.log(id)
            // setComments(response.data);
            getItem();
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

    const Empty = () => {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.EmptyText}>댓글이 없습니다.</Text>
            </View>
        )
    }

    const renderItem = ({ item }) => (
        <FancyCommentCard item={item} user_id={userId} profileImg={profileImg} deleteComment={() => deleteComment(item._id)} />
    );

    const onChangeText = (text) => {
        setInputComment(text);
    }

    const CommentListView = () => {
        return (
            <View style={styles.container}>
                <FlatList
                    data={comments}
                    ListEmptyComponent={() => <Empty />}
                    renderItem={renderItem}
                    keyExtractor={item => item._id} >
                </FlatList>
            </View>
        )
    }

    const CommentInputView = () => {
        return (
            <KeyboardAvoidingView>
                <View style={styles.ComponentContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} placeholder="댓글을 입력하세요" value={inputComment} onChangeText={onChangeText} />
                    </View>
                    <TouchableOpacity style={styles.SubmitButton} onPress={handleClick}>
                        <Text>저장</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }

    return (
        <>
            <CommentHeader />
            <CommentListView />
            {/* <CommentInputView /> */}
            <InputComment saveHandler={handleClick} />
        </>
    )
}
export default DiaryCommentView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    headerBar: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        // marginBottom: 16,
        backgroundColor: 'white',
        paddingVertical: 10,
    },
    ComponentContainer: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        padding: 10,
        justifyContent: "center",
    },
    inputContainer: {
        // flexDirection: "row",
        borderRadius: 8,
        borderWidth: 1,
        width: 320,
        height: 50,
        marginBottom: 5,
        borderColor: "gray",
    },
    input: {
        fontSize: 15,
        backgroundColor: "white",
        width: 300,
        marginRight: 20,
        padding: 10,
        marginBottom: 5,
        borderRadius: 10,
    },
    SubmitButton: {
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "whitesmoke",
        marginBottom: 5,
        marginLeft: 5,
        borderRadius: 8,
        backgroundColor: "#27ae60",
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 630,
        fontColor: "red",
        backgroundColor: "#ffffff",
    },
    EmptyText: {
        fontSize: 20
    }
})