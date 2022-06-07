import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { config } from "../../../../../config";
import { BarChart } from "react-native-gifted-charts";
import { Badge, Box, Heading, HStack, Spacer } from "native-base";


const AnonymousStatDetailView = (props) => {

    const [items, setItems] = useState([]);
    const [maxValue, setMaxValue] = useState(0);

    useEffect(() => {
        getData();
    }, [props.tagLogArr]);

    const getData = () => {
        let itemTemp = [];
        props.tagLogArr.map((tag) => (
            itemTemp.push({ value: tag.count, label: tag._id, frontColor: '#91d653' })
        ))

        let countTemp = [];
        props.tagLogArr.map((tag) => (
            countTemp.push(tag.count)
        ))
        countTemp = Math.max.apply(null, countTemp);
        countTemp = Math.ceil(countTemp / 5);

        setItems(itemTemp);
        setMaxValue(countTemp * 5);
    }

    const TagChart = (props) => {

        return (
            <View>
                <BarChart
                    barBorderRadius={4}
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

    return (
        <Box p={5}>
            <Heading mb={5} >{props.data.title}</Heading>
            <TagChart />
            <Box my={10} mx={5}>
                {props.tagLogArr.map((tag) => (
                    <HStack>
                        <Badge colorScheme="green" _text={{
                            color: "white"
                        }} variant="solid" rounded="4"
                            style={{ marginVertical: 3 }}>
                            {tag._id}
                        </Badge>
                        <Spacer />
                        <Text>{tag.count}</Text>
                    </HStack>
                ))}
            </Box>
        </Box>
    )
}

export default AnonymousStatDetailView;