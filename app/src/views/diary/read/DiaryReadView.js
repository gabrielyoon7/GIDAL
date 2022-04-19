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
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
const DiaryReadView = (props) => {
    const [date, setSelectedDate] = React.useState(props.selectedDate);
    const { width } = useWindowDimensions();
    // const item = props.navigation.getState().routes[1].params;
    const diary = props.navigation.getState().routes[1].params.diary;
    console.log(diary);
    // console.log(item.itemId);
    const deleteDiary = () => {
        console.log("l", diary._id);
        axios.post(config.ip + ':5000/diariesRouter/delete/', {
            data: {
                // id: item.itemId,
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
        onOpen,
        onClose
    } = useDisclose();
    return (
        <ScrollView style={styles.scroll}>
            <LinearGradient style={styles.header} colors={['#A6A6A6', 'black']} />
            <View style={styles.background}>
                <View style={styles.container}>
                    <HStack alignItems="center">
                        <Badge backgroundColor={generateColor()} _text={{
                            color: "white"
                        }} variant="solid" rounded="4">
                            태그명(카테고리)
                        </Badge>
                        <Badge backgroundColor={generateColor()} _text={{
                            color: "white"
                        }} variant="solid" rounded="4">
                            {diary.disclosure}
                        </Badge>
                        <Spacer />
                        <Button onPress={onOpen}>Actionsheet</Button>
                    </HStack>
                    <Text color="coolGray.800" mt="3" fontWeight="bold" fontSize="4xl">
                        {diary.title}
                    </Text>
                    <Text fontSize="sm" color="coolGray.700" my="1">
                        <Text>{showDate}</Text> <Text>{showTime}</Text>
                    </Text>
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

                    <Divider my="2" />
                    <RenderHtml

                        contentWidth={width}
                        source={source}
                    />

                    <Divider my="5" />

                    <HStack alignItems="center">

                        <Badge backgroundColor={generateColor()} _text={{
                            color: "white"
                        }} variant="solid" rounded="4">
                            태그1
                        </Badge>
                        <Badge backgroundColor={generateColor()} _text={{
                            color: "white"
                        }} variant="solid" rounded="4">
                            태그2
                        </Badge>
                        <Badge backgroundColor={generateColor()} _text={{
                            color: "white"
                        }} variant="solid" rounded="4">
                            태그3
                        </Badge>
                    </HStack>
                </View>
                <HStack margin='5' >
                    <Spacer />
                    <Spacer />


                    <Button style={styles.button} size="md" variant="subtle" onPress={
                        () => props.navigation.replace('DiaryModify', {
                            diary: diary,
                        })
                    }>
                        수정
                    </Button>

                    <Button style={styles.button} size="md" variant="subtle" onPress={() => deleteDiary()} >
                        삭제
                    </Button>

                </HStack>

                <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                    <Actionsheet.Content>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <Text fontSize="16" color="gray.500" _dark={{
                                color: "gray.300"
                            }}>
                                현재 아무런 기능을 연동하지 않은 상태임
                            </Text>
                        </Box>
                        <Actionsheet.Item startIcon={<Icon as={MaterialIcons} color="trueGray.400" mr="1" size="6" name="delete" />}>
                            Delete
                        </Actionsheet.Item>
                        <Actionsheet.Item startIcon={<Icon as={MaterialIcons} name="share" color="trueGray.400" mr="1" size="6" />}>
                            Share
                        </Actionsheet.Item>
                        <Actionsheet.Item startIcon={<Icon as={Ionicons} name="play-circle" color="trueGray.400" mr="1" size="6" />}>
                            Play
                        </Actionsheet.Item>
                        <Actionsheet.Item startIcon={<Icon as={MaterialIcons} color="trueGray.400" mr="1" size="6" name="favorite" />}>
                            Favourite
                        </Actionsheet.Item>
                        <Actionsheet.Item p={3} startIcon={<Icon color="trueGray.400" mr="1" h="24" w="24" viewBox="0 0 24 24" fill="none">
                            <Path d="M12.0007 10.5862L16.9507 5.63623L18.3647 7.05023L13.4147 12.0002L18.3647 16.9502L16.9507 18.3642L12.0007 13.4142L7.05072 18.3642L5.63672 16.9502L10.5867 12.0002L5.63672 7.05023L7.05072 5.63623L12.0007 10.5862Z" />
                        </Icon>}>
                            Cancel
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>

            </View>
        </ScrollView>
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
        height: windowHeight * 0.5,
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
})

export default DiaryReadView;