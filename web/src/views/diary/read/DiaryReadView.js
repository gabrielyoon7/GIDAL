import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const DiaryReadView = () => {
    const params = useParams();
    const diary_id = params.id;

    useEffect(() => {
        console.log(diary_id)
        getItem();
    }, [])

    const getItem = () => {
        axios.post('/diariesRouter/findOne', {
            id: diary_id,
        }).then((response) => {
            console.log(response)
            // setComments(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    }

    return(
        <div>ㅇㅇ</div>
    )
}
export default DiaryReadView;