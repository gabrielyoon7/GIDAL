
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { config } from "../../../../config";
import StatisticsCard from "../../../components/statistics/StatisticsCard";
const StatisticsList = (props) => {
    const [items, setItems] = useState([]);
    const [ref, setRef] = useState(null);

    useEffect(() => {
        getTags();
    }, []);

    useEffect(() => {

    }, [items]);

    const getTags = () => {

        let result = []
        axios.get(config.ip + ':5000/tagsRouter/find')
            .then((response) => {
                setItems(response.data);
            }).catch(function (error) {
                console.log(error);
            })
    }

    const renderItem = ({ item }) => {
        return (
            <StatisticsCard question={item.question} id={item._id} navigation={props.navigation} />
        );
    };

    return (
        <FlatList
            data={items}
            ref={(ref) => {
                setRef(ref);
            }}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
        // extraData={selectedId}
        />
    )
}
export default StatisticsList;