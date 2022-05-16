import { useNavigationState } from "@react-navigation/native";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import BackButton from "../../../components/common/BackButton";
import WelcomeCard from "../../../components/statistics/WelcomeCard";

const UserStatDetailView = (props) => {
    const new_routes = useNavigationState(state => state.routes);
    useEffect(() => {
        //초기 질문 id 수신부
        try {
            const idx = new_routes.findIndex(r => r.name === "UserStatisticsDetail")
            console.log(new_routes[idx].params);
        } catch (error) {
            // console.log(error);
        }
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <BackButton navigation={props.navigation} />
            <ScrollView>
                <Text>상세 통계 표시</Text>
            </ScrollView>
        </View>
    )
}
export default UserStatDetailView;