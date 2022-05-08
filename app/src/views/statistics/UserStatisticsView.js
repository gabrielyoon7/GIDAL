import { View } from "react-native"
import BackButton from "../../components/common/BackButton";

const UserStatisticsView = (props) => {
    return(
        <View style={{flex:1}}>
            <BackButton  navigation={props.navigation} />
            {/* 개인통계 */}
            {/* 친구통계 */}
            {/* 익명통계 */}
            </View>
    )
}

export default UserStatisticsView;