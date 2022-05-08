import { Heading } from "native-base"
import { StyleSheet, View } from "react-native";
import WelcomeCard from "../../components/statistics/WelcomeCard";
import StatisticsList from "./StatisticsList";

const StatisticsMainView = () => {
    return(
        <View style={{backgroundColor:"white", flex:1}}>
            <Heading style={styles.heading}>통계</Heading>
            <WelcomeCard/>
            <StatisticsList/>
        </View>
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
