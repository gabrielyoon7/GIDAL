import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Footer from "../../../views/common/Footer";
import Header from "../../../views/common/Header";

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

    return (
        <div>
            <Header />
            <main className="container">
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
                    <span key={tag} >{tag}  </span>
                ))
                }
            </main>
            <Footer />
        </div>
    )
}
export default DiaryReadView;