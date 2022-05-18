import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { BarChart } from "react-native-gifted-charts";

const PrivateRankCard = (props) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        getData();
    }, [props.tagLogArr]);

    const getData = () => {
        let temp = []
        props.tagLogArr.map((tag) => (
            temp.push({ value: tag.count, label: tag._id })
        ))
        console.log(temp);
        setItems(temp);
    }


    return (
        <>
            {
                props.tagLogArr.length==0 
                ?
                <View>
                    <Text>Loading...</Text>
                </View>
                :
                <BarChart
                    data={items}
                    height={120}
                    width={280}
                    maxValue={3} //MaxValue = noOfSections여야함
                    noOfSections={3}
                />
            }

            {props.tagLogArr && props.tagLogArr.slice(0, 5).map((tag) => (
                <Text key={tag._id}>{tag._id}{tag.count}</Text>
            ))}
        </>
    )
}

export default PrivateRankCard;