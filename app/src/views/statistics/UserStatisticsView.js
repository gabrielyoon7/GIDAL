import { useNavigationState } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native"
import BackButton from "../../components/common/BackButton";
import WelcomeCard from "../../components/statistics/WelcomeCard";
import AnonymousStatisticsView from "./AnonymousStatisticsView";
import FriendsStatisticsView from "./FriendsStatisticsView";
import PersonalStatisticsView from "./PersonalStatisticsView";

const UserStatisticsView = (props) => {
    const new_routes = useNavigationState(state => state.routes);
    const [id, setId] = useState('hihi');
    const [question, setQuestion] = useState('hihi2');
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        //초기 질문 id 수신부
        try {
            const idx = new_routes.findIndex(r => r.name === "UserStatistics")
            setId(new_routes[idx].params.id);
            setQuestion(new_routes[idx].params.question)
            // 여기에서 백엔드로 통계 자료 요청해야함
            // 수신 직후에 loaded를 true로 전환해줄 것
            setIsLoaded(true);
        } catch (error) {
            // console.log(error);
        }
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <BackButton navigation={props.navigation} />
            <ScrollView>
            <WelcomeCard title={question} content={id+'에서 데이터를 가져올 것임'}/>
            {/* 개인통계 */}
            <PersonalStatisticsView id={id}/>
            {/* 친구통계 */}
            <FriendsStatisticsView id={id}/>
            {/* 익명통계 */}
            <AnonymousStatisticsView id={id}/>
            </ScrollView>
        </View>
    )
}

export default UserStatisticsView;