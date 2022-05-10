import { Box, Heading, HStack, Spacer, View } from "native-base";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";



const TagRankCard = (props) => {

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
                {props.tagLogArr && props.tagLogArr.map((tag) => (
                    <Text key={tag._id}>{tag._id}{tag.count}</Text>
                ))}
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