import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { config } from "../../../config";
import TagRankCard from "../../components/statistics/TagRankCard";


const PersonalStatisticsView = (props) => {
    // 여기에서 조회 데이터를 받은 다음, 아래 TagRankCard에 값을 줘서 렌더링 할 것임
    const data = {
        type: "private",
        title: "개별 통계",
    }
    const [user_Id, setUserId] = useState('');
    const [questionId, setQuestionId] = useState(props.id);
    const [tagLogArr, setTagLogArr] = useState([]);

    useEffect(() => {
        try {
            AsyncStorage.getItem('userInfo')
                .then(value => {
                    if (value != null) {
                        const UserInfo = JSON.parse(value);
                        setUserId(UserInfo[0].user_id);
                    }
                }
                )
        } catch (error) {
            console.log(error);
        }

    }, []);

    useEffect(() => {
        getStatisticsPreview(user_Id);
    }, [user_Id]);

    const getStatisticsPreview = (user_id) => {
        if (user_Id != '') {
            axios.post(config.ip + ':5000/tagsRouter/makePersonalStatistics', {
                data: {
                    question_id: props.id,
                    user_id: user_id,
                }
            }).then((response) => {
                console.log(response.data);
                setTagLogArr(response.data);
            }).catch(function (error) {
                console.log(error);
            })

        }
    }

    return (
        <View>
            <TagRankCard data={data} tagLogArr={tagLogArr} />
        </View>
    )
}

export default PersonalStatisticsView;