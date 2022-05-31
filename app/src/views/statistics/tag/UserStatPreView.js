import { useNavigationState } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native"
import BackButton from "../../../components/common/BackButton";
import WelcomeCard from "../../../components/statistics/WelcomeCard";
import AnonymousStatPreView from "./preview/AnonymousStatPreView";
import FriendsStatPreView from "./preview/FriendsStatPreView";
import PersonalStatPreView from "./preview/PersonalStatPreView";

const UserStatPreView = (props) => {
    const new_routes = useNavigationState(state => state.routes);
    const [id, setId] = useState('hihi');
    const [question, setQuestion] = useState('hihi2');
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        //초기 질문 id 수신부
        try {
            const idx = new_routes.findIndex(r => r.name === "UserStatisticsPreview")
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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <BackButton navigation={props.navigation} />
            <ScrollView>
                {/* <WelcomeCard title={question} content={id + '에서 데이터를 가져올 것임'} /> */}
                <WelcomeCard title={question} content={'당신의 일기를 분석했어요!'} />
                {/* 개인통계 */}
                <PersonalStatPreView id={id} navigation={props.navigation} />
                {/* 친구통계 */}
                <FriendsStatPreView id={id} navigation={props.navigation} />
                {/* 익명통계 */}
                <AnonymousStatPreView id={id} navigation={props.navigation} />
            </ScrollView>
        </View>
    )
}

export default UserStatPreView;