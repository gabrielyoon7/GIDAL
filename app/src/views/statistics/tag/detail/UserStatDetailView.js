import { ScrollView, Text, View } from "react-native";
import BackButton from "../../../../components/common/BackButton";
import WelcomeCard from "../../../../components/statistics/WelcomeCard";

const UserStatDetailView = (props) => {
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