import { Box, Input, Text, TextArea, Stack, Button, HStack, Badge, Spacer, Avatar } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';
import { config } from '../../../../config'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const DiaryReadView = (props) => {
    const { width } = useWindowDimensions();
    const item = props.navigation.getState().routes[1].params;
    // console.log(item.itemId);
    const deleteDiary = () => {
        console.log("l", item.itemId);
        axios.post(config.ip + ':5000/diariesRouter/delete/', {
            data: {
                id: item.itemId
            }
        }).then((response) => {
            props.navigation.pop();
        }).catch(function (error) {
            console.log(error);
        })
    }

    const source = {
        html: item.content
      };


    return (
        <View style={styles.container}>
            <HStack alignItems="center">
                <Badge colorScheme="darkBlue" _text={{
                    color: "white"
                }} variant="solid" rounded="4">
                    태그명
                </Badge>
                <Spacer />
                <Button size="md" variant="">
                    수정
                </Button>
                <Button size="md" onPress={() => deleteDiary()} >
                    삭제
                </Button>
            </HStack>
            <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="3xl">
                {item.title}
            </Text>
            <HStack alignItems="center">
                <Avatar bg="green.500" alignSelf="center" size="xs" source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }}>
                    AJ
                </Avatar>
                <Text mx={2} fontSize="sm" color="coolGray.700">
                    작성자
                </Text>
                <Spacer />
                <Text fontSize="sm" color="coolGray.700">
                    {item.selectedDate}
                </Text>
            </HStack>
            {/* <Text mt="2" fontSize="md" color="coolGray.700">
                {item.content}
            </Text> */}
            <RenderHtml
                contentWidth={width}
                source={source}
            />
            <Stack mb="2.5" mt="1.5" direction={{
                base: "column",
                md: "row"
            }} space={2} mx={{
                base: "auto",
                md: "0"
            }}>

            </Stack>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
})

export default DiaryReadView;