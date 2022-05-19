import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { config } from "../../../../../config";
import { BarChart } from "react-native-gifted-charts";
import { Badge, Box, Heading, HStack, Spacer } from "native-base";


const PersonalStatDetailView = (props) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        getData();
    }, [props.tagLogArr]);

    const getData = () => {
        let temp = []
        props.tagLogArr.map((tag) => (
            temp.push({ value: tag.count, label: tag._id, frontColor: '#4ABFF4' })
        ))
        console.log(temp);
        setItems(temp);
    }

    const TagChart = (props) => {

        return (
            <View>
                <BarChart
                    showFractionalValue
                    showYAxisIndices
                    noOfSections={4}
                    maxValue={4}
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
                        }} variant="solid" rounded="4">
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

export default PersonalStatDetailView;