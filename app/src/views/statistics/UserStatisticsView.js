import { useNavigationState } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import BackButton from "../../components/common/BackButton";
import PersonalStatisticsView from "./PersonalStatisticsView";

const UserStatisticsView = (props) => {
    const new_routes = useNavigationState(state => state.routes);
    const [id, setId] = useState('hihi');
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        //초기 질문 id 수신부
        try {
            const idx = new_routes.findIndex(r => r.name === "UserStatistics")
            setId(new_routes[idx].params.id);
            // 여기에서 백엔드로 통계 자료 요청해야함
            // 수신 직후에 loaded를 true로 전환해줄 것
            setIsLoaded(true);
        } catch (error) {
            // console.log(error);
        }
    })
    return (
        <View style={{ flex: 1 }}>
            <BackButton navigation={props.navigation} />
            <Text>{id}</Text>
            {/* 개인통계 */}
            <PersonalStatisticsView/>
            {/* 친구통계 */}
            {/* 익명통계 */}
        </View>
    )
}

export default UserStatisticsView;