import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Footer from "../../../views/common/Footer";
import Header from "../../../views/common/Header";
import DOMPurify from 'dompurify';

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
// useLayoutEffect
    useEffect(() => {
        (async function (){
            // await getItem();
            // const {data} = await axios.post('/diariesRouter/findOne', {
            //     id: diary_id,
            // })
            // setDiary(data);

            const data = await getItem(diary_id);
            setDiary(data);
        })()
        // console.log(diary_id)
        // getItem();
        return ()=>{
            
        }
    }, [])

    const getItem = async (diary_id) => {
        const {data} = await axios.post('/diariesRouter/findOne', {
            id: diary_id,
        })
        return data;
        // setDiary(data);
        // .then((response) => {
        //     console.log(response.data)
        //     setDiary(response.data);
        // }).catch(function (error) {
        //     console.log(error);
        // })
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    };

    return (
        <div>
            <Header />
            <main className="container">
                <h1>{diary.title}</h1>
                <p>{diary.date}</p>
                <div className="row">
                    <p className="col-auto me-auto">{diary.user_id}</p>
                    <p className="col-auto"><i class="bi bi-chat-right-text me-2"></i>{diary.comments.length}</p>
                    <p className="col-auto"><i class="bi bi-heart me-2"></i>{diary.likers.length}</p>
                </div>
                <hr />
                <div>
                    <div dangerouslySetInnerHTML={createMarkup(diary.content)}></div>
                </div>
                <hr />
                {diary.tags.map((tag) => (
                    <button key={tag} type="button" class="btn btn-success disabled me-1">{tag}</button>
                ))}
            </main>
            <Footer />
        </div>
    )
}
export default DiaryReadView;