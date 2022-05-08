import { View } from "native-base"
import { Text } from "react-native";
import StatisticsMainView from "../../views/statistics/StatisticsMainView";

const StatisticsRoute = (props) => {
    return(
        <StatisticsMainView navigation={props.navigation}/>
    )
}

export default StatisticsRoute;