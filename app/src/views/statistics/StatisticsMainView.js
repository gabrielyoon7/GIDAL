import { Heading } from "native-base"
import { StyleSheet, View } from "react-native";
import WelcomeCard from "../../components/statistics/WelcomeCard";
import TodoStatisticsCard from "../../components/statistics/TodoStatisticsCard"
import StatisticsList from "./tag/StatisticsList";

const StatisticsMainView = (props) => {
    return(
        <View style={{backgroundColor:"white", flex:1}}>
            <Heading style={styles.heading}>통계</Heading>
            <WelcomeCard title="앱 사용 분석 서비스" icon="ios-stats-chart" content="여러분이 기록한 삶을 분석해드립니다."/>
            <TodoStatisticsCard navigation={props.navigation} />
            <StatisticsList navigation={props.navigation}/>
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
