import { useEffect, useState } from "react";
import axios from 'axios';
import DiaryPostCard from "../../components/diary/DiaryPostCard";
const DiarySnsFeedView = () => {
    
    const [items, setItems] = useState([]);

    useEffect(() => {
        getitems();
    }, []);

    const getitems = () => {
        let result = []
        axios.post('/diariesRouter/findPublic')
            .then((response) => {
                if (response.data.length > 0) {
                    response.data.forEach((item) => {
                        result.push(item);
                    });
                }
                setItems(result);
            }).catch(function (error) {
                console.log(error);
            })
        console.log(result);
    }

    return(
        <div>
            {items.map((diary)=>(
                <DiaryPostCard diary={diary} />
            ))}
        </div>
    )
}

export default DiarySnsFeedView;