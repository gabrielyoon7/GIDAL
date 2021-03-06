import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const AnonymousRankCard = (props) => {

    const [items, setItems] = useState([]);
    const [maxValue, setMaxValue] = useState(0);

    useEffect(() => {
        getData();
    }, [props.tagLogArr]);

    const getData = () => {
        let itemTemp = [];
        props.tagLogArr.map((tag) => (
            itemTemp.push({ value: tag.count, label: tag._id })
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

    return (
        <>
            {
                props.tagLogArr.length == 0
                    ?
                    <View>
                        <LoadingSpinner />
                    </View>
                    :
                    <BarChart
                        frontColor={'#91d653'}
                        barBorderRadius={4}
                        data={items}
                        height={120}
                        width={280}
                        maxValue={maxValue} //MaxValue = noOfSections여야함
                        noOfSections={5}
                        hideRules
                    />
            }
        </>
    )
}

export default AnonymousRankCard;