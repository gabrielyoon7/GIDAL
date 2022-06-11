import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { config } from "../../../../../config";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import TagRankCard from "../../../../components/statistics/TagRankCard";


const AnonymousStatPreView = (props) => {
    // 여기에서 조회 데이터를 받은 다음, 아래 TagRankCard에 값을 줘서 렌더링 할 것임
    const data = {
        type: "anonymous",
        title: "익명 통계",
    }

    const [tagLogArr, setTagLogArr] = useState([]);
    const [isEmpty, setEmpty] = useState(false);

    useEffect(() => {
        if (props.id !== 'hihi') {
            getStatisticsPreview();
        }
    }, [props.id]);

    const getStatisticsPreview = () => {
        axios.post(config.ip + ':5000/tagsRouter/makeAnonymousStatistics', {
            data: {
                question_id: props.id,
                // user_id: user_id,
            }
        }).then((response) => {
            let temp = response.data;
            if (temp.length !== 0) {
                setTagLogArr([...temp]); //re-rendering 시 매우 중요함
            }
            if(response.data.length === 0){
                setEmpty(true);
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <View>
            <TagRankCard data={data} tagLogArr={tagLogArr} isEmpty={isEmpty} navigation={props.navigation} />
        </View>
    )
}

export default AnonymousStatPreView;