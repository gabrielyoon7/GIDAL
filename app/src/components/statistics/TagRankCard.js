import { Box, Heading, HStack, Pressable, Spacer, View } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import AnonymousRankCard from "./interaction/AnonymousRankCard";
import FriendsRankCard from "./interaction/FriendsRankCard";
import PrivateRankCard from "./interaction/PrivateRankCard";
import { BarChart, PieChart } from "react-native-gifted-charts";



const TagRankCard = (props) => {

    const type = {
        private: {
            interaction: <PrivateRankCard tagLogArr={props.tagLogArr} />,
        },
        friends: {
            interaction: <FriendsRankCard tagLogArr={props.tagLogArr} tags={props.tags} />,
        },
        anonymous: {
            interaction: <AnonymousRankCard tagLogArr={props.tagLogArr} />,
        },
    };
    const card_type = type[props.data.type];
    return (

        <Box alignItems="center" py="1" px="1">
            <Pressable
                onPress={
                    () => {
                        props.navigation.navigate('UserStatisticsDetail', {
                            data: props.data,
                            tagLogArr: props.tagLogArr,
                        })
                    }
                }
            >
                {({
                    isHovered,
                    isFocused,
                    isPressed
                }) => {
                    return (
                        <Box
                            maxW="96%"
                            minW="96%"
                            borderWidth="1"
                            borderColor="coolGray.300"
                            shadow="3"
                            bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "white"}
                            p="5"
                            rounded="8"
                            style={{
                                transform: [{
                                    scale: isPressed ? 0.96 : 1
                                }],
                            }}
                        >
                            <Box pb="3">
                                <HStack>
                                    <Heading size="md" isTruncated>
                                        {props.data.title}
                                    </Heading>
                                    <Spacer />
                                    <Text>자세히 보기</Text>
                                </HStack>
                                <Box mt={3}>
                                    {card_type ? (<View style={styles.interaction}>{card_type.interaction}</View>) : (<View><Text>Wrong type</Text></View>)}
                                </Box>
                            </Box>

                        </Box>
                    )
                }}
            </Pressable>
        </Box>
    )
}

export default TagRankCard;


const styles = StyleSheet.create({

    card: { //통계리스트 카드 색
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 3,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#e6e6e6',
        flexDirection: 'row',
        shadow: 3,
        borderRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#d1d2d1",


    },

    graph: {
        height: 150,
        backgroundColor: 'green',
    }
});