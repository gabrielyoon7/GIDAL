import { Heading } from "native-base"
import { StyleSheet, View } from "react-native";
import WelcomeCard from "../../components/statistics/WelcomeCard";
import TodoStatisticsCard from "../../components/statistics/TodoStatisticsCard"
import StatisticsList from "./tag/StatisticsList";

const StatisticsMainView = (props) => {
    return(
        <View style={{backgroundColor:"white", flex:1}}>
            <Heading style={styles.heading}>통계</Heading>
            <WelcomeCard title="태그 분석 서비스" content="여러분이 평소에 입력한 태그를 분석해드립니다. 사진이나 아이콘으로 이 부분 좀 꾸며주세요dddd"/>
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
