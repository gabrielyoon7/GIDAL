import { Box, Input, Text, TextArea, Stack, Button, HStack, Badge, Spacer, Avatar, Divider, ScrollView, useDisclose, Actionsheet, Icon, Image, Center, Stagger, IconButton } from 'native-base';
import * as React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { config } from '../../../../config'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment';
import { Path } from "react-native-svg";
import { AntDesign, MaterialCommunityIcons, MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
// import DiaryReadStaggerButton from './DiaryReadStaggerButton';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { useNavigationState } from '@react-navigation/native';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const DiaryReadView = (props) => {
    // const [date, setSelectedDate] = React.useState(props.selectedDate);
    const { width } = useWindowDimensions();
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
        "title": "loading...",
        "user_id": "loading...",
    };
    const [diary, setDiary] = React.useState(defaultData);
    const [isLoaded, setIsLoaded] = React.useState(false);
    React.useEffect(() => {
        //초기 일기 수신부
        try {
            const idx = new_routes.findIndex(r => r.name === "DiaryRead")
            setDiary(new_routes[idx].params.diary);
            setIsLoaded(true);
        } catch (error) {
            // console.log(error);
        }
    })

    const [likeCount, setLikeCount] = React.useState(diary.likes)
    const [liked, setLiked] = React.useState(false)
    const deleteDiary = () => {
        console.log("l", diary._id);
        axios.post(config.ip + ':5000/diariesRouter/delete/', {
            data: {
                id: diary._id,
            }
        }).then((response) => {
            axios.post(config.ip + ':5000/tagsRouter/deleteMany/', {
                data: {
                  id: diary._id,
                }
              }).then((response) => {
                props.navigation.pop();
              }).catch(function (error) {
                console.log(error);
              })
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
        if (liked) {
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

    const ReadView = () => {
        return (
            <View style={styles.background}>
                <View style={styles.container}>
                    <Box style={styles.row} justifyContent="center" display="flex">
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
                            key={diary.disclosure}
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
                    <Box style={styles.row} justifyContent="center" display="flex">
                        <TouchableOpacity onPress={
                            () => props.navigation.navigate('UserProfile', {
                                user_id: diary.user_id
                            })
                            // ()=>console.log(diary.user_id)
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
                        <TouchableOpacity onPress={() => pressHeart()} style={{ flex: 1, flexDirection: 'row-reverse', alignSelf: 'center', marginLeft: 10 }}>
                            {liked ? <Ionicons name="heart" size={24} color="red" /> : <Ionicons name="md-heart-outline" size={24} color="gray" />}
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
                                key={tag}
                            >
                                {tag}
                            </Badge>
                        ))
                        }
                    </HStack>
                </View>
            </View>
        );
    }

    return (
        <>
            {isLoaded
            ?
            <ParallaxScrollView
                style={{ flex: 1 }}
                parallaxHeaderHeight={windowHeight * 0.3}
                renderForeground={() => (
                    <Image
                        style={styles.header}
                        source={{ uri: 'https://t1.daumcdn.net/cfile/blog/99EC04465C9B308326' }}
                        alt="Alternate Text"
                    />
                )}
            >
                <ReadView/>
            </ParallaxScrollView>
            :
            <LoadingSpinner />
            }
            <Center style={{ position: 'absolute', right: 20, bottom: 130, height: 30,}} >
                <Box maxW="100">
                    <Stagger    visible={isOpen} 
                        initial={{
                        opacity: 0,
                        scale: 0,
                        translateY: 34
                    }} animate={{
                        translateY: 0,
                        scale: 1,
                        opacity: 1,
                        transition: {
                            type: "spring",
                            mass: 0.8,
                            stagger: {
                                offset: 30,
                                reverse: true
                            }
                        }
                    }} exit={{
                        translateY: 34,
                        scale: 0.5,
                        opacity: 0,
                        transition: {
                            duration: 100,
                            stagger: {
                                offset: 30,
                                reverse: true
                            }
                        }
                    }}>

                        <IconButton
                            mb="3"
                            margin={1}
                            variant="solid"
                            bg="indigo.500"
                            colorScheme="indigo"
                            borderRadius="full"
                           
                            icon={
                                <Icon
                                    as={FontAwesome5}
                                    size="6"
                                    name="pencil-alt"
                                    _dark={{
                                        color: "warmGray.50"
                                    }}
                                    color="warmGray.50"
                                />
                            }
                            onPress={
                                () => props.navigation.navigate('DiaryModify', {
                                    diary: diary,
                                })
                            }
                        />
                        <IconButton
                            mb="3"
                            margin={1}
                            variant="solid"
                            bg="yellow.500"
                            colorScheme="yellow"
                            borderRadius="full"
                            icon={
                                <Icon
                                    as={MaterialIcons}
                                    size="6"
                                    name="delete"
                                    _dark={{
                                        color: "warmGray.50"
                                    }}
                                    color="warmGray.50"
                                />
                            }
                            onPress={
                                () => deleteDiary()
                            }
                        />
                    </Stagger>
                </Box>
                <HStack alignItems="center">
                    <IconButton style={{backgroundColor :"#27ae60"}} variant="solid" borderRadius="full" shadow={2} size="lg" onPress={onToggle} bg="cyan.400" icon={<Icon as={MaterialCommunityIcons} size="7" name="dots-horizontal"  color="warmGray.50" _dark={{
                        color: "warmGray.50"
                    }} />} />
                </HStack>
            </Center>
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
        minHeight: windowHeight * 0.4,
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