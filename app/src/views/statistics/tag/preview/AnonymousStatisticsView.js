import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { config } from "../../../../../config";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import TagRankCard from "../../../../components/statistics/TagRankCard";


const AnonymousStatisticsView = (props) => {
    // 여기에서 조회 데이터를 받은 다음, 아래 TagRankCard에 값을 줘서 렌더링 할 것임
    const data = {
        type:"anonymous",
        title:"익명 통계",
    }

    const [isLoaded, setIsLoaded] = useState(false);
    const [questionId, setQuestionId] = useState(props.id);
    const [tagLogArr, setTagLogArr] = useState([]);
    const [reRequestCount, setReRequestCount] = useState(0);

    useEffect(() => {
        getStatisticsPreview();
    }, [questionId]);

    const getStatisticsPreview = () => {
        axios.post(config.ip + ':5000/tagsRouter/makeAnonymousStatistics', {
            data: {
                question_id: props.id,
                // user_id: user_id,
            }
        }).then((response) => {
            console.log(response.data);
            let temp = response.data;
            setTagLogArr([...temp]); //re-rendering 시 매우 중요함
        }).catch(function (error) {
            console.log(error);
        })
    }

    useEffect(() => {
        setIsLoaded(true);
        if(tagLogArr.length==0){
            // console.log('re-request count : '+reRequestCount);
            getStatisticsPreview();
            setReRequestCount(reRequestCount+1);
        }
    }, [tagLogArr]);

    return(
        <View>
            {isLoaded
            ?
            <TagRankCard data={data} tagLogArr={tagLogArr} />
            :
            <LoadingSpinner />
            }
        </View>
    )
}

export default AnonymousStatisticsView;