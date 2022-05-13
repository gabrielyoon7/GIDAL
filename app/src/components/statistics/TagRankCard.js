import { Box, Heading, HStack, Spacer, View } from "native-base";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import FriendsRankCard from "./interaction/FriendsRankCard";
import PrivateRankCard from "./interaction/PrivateRankCard";



const TagRankCard = (props) => {
    const type = {
        private: {
            interaction: <PrivateRankCard tagLogArr={props.tagLogArr} />,
        },
        friends: {
            interaction: <FriendsRankCard tagLogArr={props.tagLogArr} />,
        },
    };
    const card_type = type[props.data.type];
    return (
        <View style={styles.card}>
            <Box pb="3">
                <HStack>
                    <Heading size="md" isTruncated>
                        {props.data.title}
                    </Heading>
                    <Spacer />
                    <TouchableOpacity onPress={() => console.log(props.tagLogArr)}>
                        <HStack>
                            <Text>자세히 보기</Text>
                        </HStack>
                    </TouchableOpacity>
                </HStack>
                {/* {props.tagLogArr && props.tagLogArr.slice(0, 5).map((tag) => (
                    <Text key={tag._id}>{tag._id}{tag.count}</Text>
                ))} */}
                {card_type ? (<View style={styles.interaction}>{card_type.interaction}</View>) : (<View><Text>Wrong type</Text></View>)}
            </Box>
        </View>
    )
}

export default TagRankCard;


const styles = StyleSheet.create({

    card: {
        backgroundColor: '#E8D9FF',
        marginVertical: 10,
        borderRadius: 10,
        height: 200,
        padding: 20,
        marginHorizontal: 10,
    },

});