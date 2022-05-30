import axios from "axios";
import { Badge, Box, Heading, HStack, Spacer } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { BarChart } from "react-native-gifted-charts";
import { config } from "../../../../../config";

const TagChart = (props) => {
    const [items, setItems] = useState([]);
    const [maxValue, setMaxValue] = useState(0);

    useEffect(() => {
        getData();
    }, [props.statics]);

    const getData = () => {
        let itemTemp = [];
        props.statics.map((tag) => (
            itemTemp.push({ value: tag.count, label: tag._id, frontColor: '#4ABFF4' })
        ))
        // console.log(itemTemp);

        let countTemp = [];
        props.statics.map((tag) => (
            countTemp.push(tag.count)
        ))
        countTemp = Math.max.apply(null, countTemp);
        // console.log(countTemp);

        setItems(itemTemp);
        setMaxValue(countTemp);
    }

    return (
        <View style={{marginVertical: 15}}>
            <BarChart
                showFractionalValue
                showYAxisIndices
                noOfSections={5}
                maxValue={maxValue}
                data={items}
                isAnimated
            />
        </View>
    );
}

const FriendsStatDetailView = (props) => {

    return (
        <Box p={5} >
            <Heading mb={5} >{props.data.title}</Heading>

            {props.tagLogArr && props.tagLogArr.map((friend) => (
                <Box my={3} key={friend.id}>
                    <TouchableOpacity onPress={
                            () => props.navigation.navigate('UserProfile', {
                                user_id: friend.id
                            })
                    }>
                            <Text style={styles.sectionHeader}>{friend.id}</Text>
                    </TouchableOpacity>

                    {friend.statics.length !== 0 ? <TagChart statics={friend.statics} /> : <Text style={styles.item}>작성한 일기가 없습니다</Text>}
                    
                    {/* <Text></Text> */}
                    {friend?.statics?.map((tag) => (
                        // <Text style={styles.item} key={tag._id}>{tag._id} {tag.count}</Text>
                        <Box mx={5}>
                            <HStack>
                                <Badge colorScheme="green" _text={{
                                color: "white"
                                }} variant="solid" rounded="4"
                                style={{marginVertical: 3}}>
                                    {tag._id}
                                </Badge>
                                <Spacer />
                                <Text>{tag.count}</Text>
                            </HStack>
                        </Box>
                    ))}
                </Box>
            ))}
        </Box>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})

export default FriendsStatDetailView;