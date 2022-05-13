import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { config } from "../../../config";
import TagRankCard from "../../components/statistics/TagRankCard";


const AnonymousStatisticsView = (props) => {
    // 여기에서 조회 데이터를 받은 다음, 아래 TagRankCard에 값을 줘서 렌더링 할 것임
    const data = {
        type:"anonymous",
        title:"익명 통계",
    }

    const [questionId, setQuestionId] = useState(props.id);
    const [tagLogArr, setTagLogArr] = useState([]);

    useEffect(() => {
        getStatisticsPreview();
    }, []);

    const getStatisticsPreview = () => {
        axios.post(config.ip + ':5000/tagsRouter/makeAnonymousStatistics', {
            data: {
                question_id: props.id,
                // user_id: user_id,
            }
        }).then((response) => {
            console.log(response.data);
            setTagLogArr(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    }



    return(
        <View>
            <TagRankCard data={data}/>
        </View>
    )
}

export default AnonymousStatisticsView;