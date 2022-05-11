import { useNavigationState } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native"
import BackButton from "../../components/common/BackButton";
import WelcomeCard from "../../components/statistics/WelcomeCard";
import AnonymousStatisticsView from "./AnonymousStatisticsView";
import FriendsStatisticsView from "./FriendsStatisticsView";
import PersonalStatisticsView from "./PersonalStatisticsView";

const TodoStatisticsView = (props) => {    
    return (
        <View style={{ flex: 1 }}>
            <BackButton navigation={props.navigation} />
            <ScrollView>
            <WelcomeCard title={"Todo"} content={0+'에서 데이터를 가져올 것임'}/>
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

export default TodoStatisticsView;