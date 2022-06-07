import { useNavigationState } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import BackButton from "../../../components/common/BackButton";
import AnonymousStatDetailView from "./detail/AnonymousStatDetailView";
import FriendsStatDetailView from "./detail/FriendsStatDetailView";
import PersonalStatDetailView from "./detail/PersonalStatDetailView";

const UserStatDetailView = (props) => {

    const [statType, setStatType] = useState('loading');
    const [data, setData] = useState({"title": "ㅇㅇ", "type": "ㅇㅇ"});
    const [tagLogArr, setTagLogArr] = useState([]);
    const new_routes = useNavigationState(state => state.routes);
    
    useEffect(() => {
        //초기 질문 id 수신부
        try {
            const idx = new_routes.findIndex(r => r.name === "UserStatisticsDetail")
            console.log(new_routes[idx].params);
            const receivedData = new_routes[idx].params;
            setStatType(receivedData.data.type);
            setData(receivedData.data)
            setTagLogArr(receivedData.tagLogArr);
        } catch (error) {
            // console.log(error);
        }
    }, []);

    useEffect(() => {
        // console.log(statType);
    },[statType]);

    const StatDeatilView = () =>{
        if(statType=='private'){
            return(
                <PersonalStatDetailView data={data} tagLogArr={tagLogArr} />
            )
        }
        if(statType=='friends'){
            return(
                <FriendsStatDetailView data={data} tagLogArr={tagLogArr} navigation={props.navigation}/>
            )
        }
        if(statType=='anonymous'){
            return(
                <AnonymousStatDetailView data={data} tagLogArr={tagLogArr} />
            )
        }
        else{
            return(
                <View><Text>dd</Text></View>
            )
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <BackButton navigation={props.navigation} />
            <ScrollView>
                <StatDeatilView/>
            </ScrollView>
        </View>
    )
}
export default UserStatDetailView;