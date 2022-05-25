import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const DiaryReadView = () => {
    const params = useParams();
    const diary_id = params.id;
    const defaultData = {
        "__v": 0,
        "_id": "626f78c19ee18cdc829a10de",
        "accessible_user": [],
        "comments": [],
        "content": "loading...",
        "date": "2022-05-02T00:00:00.000Z",
        "disclosure": "private",
        "likes": 0,
        "stickers": [],
        "tags": [],
        "likers": [],
        "title": "loading...",
        "user_id": "loading...",
    };
    const [diary, setDiary] = useState(defaultData);

    useEffect(() => {
        console.log(diary_id)
        getItem();
    }, [])

    const getItem = () => {
        axios.post('/diariesRouter/findOne', {
            id: diary_id,
        }).then((response) => {
            console.log(response.data)
            setDiary(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const RenderContent = () => {
        // 여긴 수정이 필요할 듯
        return diary.content;
    }

    return(
        <div>
            <h1>{diary.title}</h1>
            <p>{diary.date}</p>
            <div className="row">
                <p className="col-6">{diary.user_id}</p>
                <p className="col-6">heart</p>
            </div>
            <hr />
            <div>
                <p><RenderContent /></p>
            </div>
            <hr />
            {diary.tags.map((tag) => (
                // <Badge
                //     backgroundColor={generateColor()}
                //     _text={{
                //         color: "white"
                //     }}
                //     variant="solid"
                //     rounded="4"
                //     key={tag}
                // >
                //     {tag}
                // </Badge>
                <span key={tag} >{tag}  </span>
            ))
            }
        </div>
    )
}
export default DiaryReadView;