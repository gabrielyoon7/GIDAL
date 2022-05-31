import { Box, Input, Text, TextArea, Stack, Button, HStack, Badge, Spacer, Avatar, Divider, ScrollView, useDisclose, Actionsheet, Icon, Image, Center, Stagger, IconButton } from 'native-base';
import * as React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const DmReadView = (props) => {
    const { width } = useWindowDimensions();
    const new_routes = useNavigationState(state => state.routes);
    // console.log(new_routes);
    const defaultData = {
        "__v": 0,
        "_id": "626f78c19ee18cdc829a10de",
        "accessible_user": [],
        "comments": [],
        "content": "loading...",
        "date": "2022-05-02T00:00:00.000Z",
        "title": "loading...",
        "user_id": "loading...",
    };
    const defaultImg = "https://cdn-icons-png.flaticon.com/512/1/1247.png"
    const [diary, setDiary] = React.useState(defaultData);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [profile, setProfile] = React.useState(defaultImg);
    const [writer, setWriter] = React.useState(props.userName);
    const [user_id, setUserId] = React.useState(defaultData);

    React.useEffect(() => {
        //초기 일기 수신부
        try {
            const idx = new_routes.findIndex(r => r.name === "DmRead")
            const diary = new_routes[idx].params.diary;
            const user_id = new_routes[idx].params.user_id;
            const profile = new_routes[idx].params.profileImg;
            const writer = new_routes[idx].params.writer;
            setDiary(diary);
            setWriter(writer)
            setUserId(user_id);
            setProfile(profile);
            setIsLoaded(true);
        } catch (error) {
            // console.log(error);
        }
    }, [])

    const source = {
        html: diary.content,
    };

    const showDate = diary.date.substring(0, 10);

    const ReadHeader = () => {
        return (
            <Box style={styles.headerBar} justifyContent="center" display="flex">
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, flexDirection: 'row', paddingLeft: 10 }} >
                    <AntDesign style={styles.allowIcon} name="left" size={24} color="black" />
                </TouchableOpacity>
            </Box>
        );
    }

    const ReadView = () => {
        let avatar_text = '';
        let avatar_color = 'white';
        user_id === writer
        ?
        (avatar_text='나',avatar_color='green.500')
        :(avatar_text='친구',avatar_color='yellow.500') 

        return (
            <View style={styles.background}>
                <View style={styles.container}>
                    {/* <ReadHeader/> */}
                    <Text color="coolGray.800" mt="3" fontWeight="bold" fontSize="4xl">
                        {diary.title}
                    </Text>
                    <Text fontSize="sm" color="coolGray.700" my="1">
                        <Text>{showDate}</Text> <Text>{diary.time}</Text>
                    </Text>
                    <HStack>
                        <TouchableOpacity onPress={
                            () => props.navigation.navigate('UserProfile', {
                                user_id: writer
                            })
                            // ()=>console.log(diary.user_id)
                        }>
                            <HStack alignItems="center" my="1">
                                <Avatar bg="green.500" alignSelf="center" size="sm" source={{
                                    uri: profile
                                }}>
                                    {
                        avatar_text
                    }
                                </Avatar>
                                <Text mx={2} fontSize="md" color="coolGray.700">
                                    {writer}
                                </Text>
                                <Spacer />
                            </HStack>
                        </TouchableOpacity>
                        <Spacer />

                    </HStack>
                    {/* </Box> */}


                    <Divider my="2" />
                    <View style={styles.source}>
                        <RenderHtml
                            contentWidth={width}
                            source={source}
                        />
                    </View>
                    <Divider my="5" />
                </View>
            </View>
        );
    }

    return (
        <>
                <ParallaxScrollView
                    style={{ flex: 1 }}
                    backgroundColor="white"
                    parallaxHeaderHeight={windowHeight * 0.3}
                    renderFixedHeader={() => <ReadHeader />}
                    // stickyHeaderHeight={40}
                    renderForeground={() => (
                        <Image
                            style={styles.header}
                            source={{ uri: 'https://t1.daumcdn.net/cfile/blog/99EC04465C9B308326' }}
                            alt="Alternate Text"
                        />
                    )}
                >
                    <ReadView />
                </ParallaxScrollView>
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

export default React.memo(DmReadView);