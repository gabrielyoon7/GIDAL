import { Heading } from "native-base"
import { StyleSheet } from "react-native";
import StatisticsList from "./StatisticsList";

const StatisticsMainView = () => {
    return(
        <>
            <Heading style={styles.heading}>통계</Heading>
            <StatisticsList/>
        </>
    )
}

export default StatisticsMainView;

const styles = StyleSheet.create({
    heading: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
});
