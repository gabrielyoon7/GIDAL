import { Box, Input, Text, TextArea, Stack, Button, HStack, Badge, Spacer, Avatar, Divider, ScrollView, useDisclose, Actionsheet, Icon } from 'native-base';
import * as React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { config } from '../../../../config'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment';
import { Path } from "react-native-svg";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import DiaryReadStaggerButton from './DiaryReadStaggerButton';
const DiaryReadView = (props) => {
    const [date, setSelectedDate] = React.useState(props.selectedDate);
    const { width } = useWindowDimensions();
    const diary = props.navigation.getState().routes[1].params.diary;
    const [likeCount, setLikeCount] = React.useState(diary.likes)
    const [liked, setLiked] = React.useState(false)
    const deleteDiary = () => {
        console.log("l", diary._id);
        axios.post(config.ip + ':5000/diariesRouter/delete/', {
            data: {
                id: diary._id,
            }
        }).then((response) => {
            props.navigation.pop();
        }).catch(function (error) {
            console.log(error);
        })
    }

    const source = {
        html: diary.content,
    };
    const sdate = diary.date;
    const showDate = sdate.substring(0, 10);
    const showTime = sdate.substring(11, 19);

    const generateColor = () => { //컬러 랜덤 지정
        const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
        return `#${randomColor}`;
    };
    const {
        isOpen,
        onToggle
      } = useDisclose();

    const pressHeart = () => {
        setLiked(!liked);
    }

    React.useEffect(() => {
        if(liked) {
            setLikeCount(likeCount - 1)
        } else {
            setLikeCount(likeCount + 1)
        }

        axios.post(config.ip + ':5000/diariesRouter/modifyLikeCount/', {
            data: {
                id: diary._id,
                likes: likeCount,
            }
        }).then((response) => {
            console.log(likeCount);
        }).catch(function (error) {
            console.log(error);
        })
    }, [liked]);

    return (
        <>
        <ScrollView style={styles.scroll}>
            <LinearGradient style={styles.header} colors={['#A6A6A6', 'black']} />
            <View style={styles.background}>
                <View style={styles.container}>
                <Box  style={styles.row} justifyContent="center" display="flex">
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, flexDirection: 'row' }} >
                        <AntDesign style={styles.allowIcon} name="left" size={24} color="black" />
                    </TouchableOpacity>
                </Box>
                    <HStack alignItems="center">
                    <Badge
                                backgroundColor="emerald.400"
                                _text={{
                                    color: "white"
                                }}
                                variant="solid"
                                rounded="4"
                                key = {diary.disclosure}
                            >
                                {diary.disclosure}
                            </Badge>
                        <Spacer />
                    </HStack>
                    <Text color="coolGray.800" mt="3" fontWeight="bold" fontSize="4xl">
                        {diary.title}
                    </Text>
                    <Text fontSize="sm" color="coolGray.700" my="1">
                        <Text>{showDate}</Text> <Text>{showTime}</Text>
                    </Text>
                    <Box  style={styles.row} justifyContent="center" display="flex">
                        <TouchableOpacity onPress={
                            () => props.navigation.navigate('OtherUsersProfile', {
                                user_id: diary.user_id
                            })
                        }>
                            <HStack alignItems="center" my="1">
                                <Avatar bg="green.500" alignSelf="center" size="sm" source={{
                                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                }}>
                                    AJ
                                </Avatar>
                                <Text mx={2} fontSize="md" color="coolGray.700">
                                    {diary.user_id}
                                </Text>
                                <Spacer />
                            </HStack>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => pressHeart()} style={{ flex: 1, flexDirection: 'row-reverse', alignSelf: 'center', marginLeft: 10}}>
                                    {liked ? <Ionicons name="heart" size={24} color="black"/> : <Ionicons name="md-heart-outline" size={24} color="black"/>}
                        </TouchableOpacity>
                    </Box>
                    

                    <Divider my="2" />
                    <View style={styles.source}>
                        <RenderHtml                            
                            contentWidth={width}
                            source={source}
                        />
                    </View>
                    <Divider my="5" />

                    <HStack alignItems="center">
                        {diary.tags.map((tag) => (
                            <Badge
                                backgroundColor={generateColor()}
                                _text={{
                                    color: "white"
                                }}
                                variant="solid"
                                rounded="4"
                                key = {tag}
                            >
                                {tag}
                            </Badge>
                        ))
                        }
                    </HStack>
                </View>
                <HStack margin='5' >
                    <Spacer />
                    <Spacer />


                    <Button style={styles.button}  colorScheme="green" size="md"  onPress={
                        () => props.navigation.replace('DiaryModify', {
                            diary: diary,
                        })
                    }>
                        수정
                    </Button>

                    <Button style={styles.button}  colorScheme="green" size="md"  onPress={() => deleteDiary()} >
                        삭제
                    </Button>

                </HStack>
            </View>
        </ScrollView>
        {/* <DiaryReadStaggerButton/> */}
        </>
    )
}

const windowHeight = Dimensions.get('window').height;
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
        height: windowHeight * 0.3,
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
        minHeight: windowHeight *0.4,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 16,
        // backgroundColor: 'black'
      },
})

export default DiaryReadView;