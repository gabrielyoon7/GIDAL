import { useEffect, useState } from "react";
import axios from 'axios';
import DiaryPostCard from "../../components/diary/DiaryPostCard";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import moment from 'moment';
import DiaryMobileReadView from "../diary/read/DiaryMobileReadView";

const DiarySnsFeedView = () => {
    const [value, onChange] = useState(new Date());
    const [items, setItems] = useState([]);
    const [mostLikersItems, setMostLikersItems] = useState([]);
    const [diary, setDiary] = useState(null);
    useEffect(() => {
        getitems();
    }, []);

    useEffect(() => {
        console.log(moment(value).format("YYYY-MM-DD"))
        getMostLikersItems();
    }, [value])

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

    const getMostLikersItems = () => {
        let result = []
        axios.post('/diariesRouter/findMostLikersDiary', {
            date: moment(value).format("YYYY-MM-DD")
        })
            .then((response) => {
                if (response.data.length > 0) {
                    response.data.forEach((item) => {
                        result.push(item);
                    });
                }
                setMostLikersItems(result);
            }).catch(function (error) {
                console.log(error);
            })
        console.log(result);
    }

    return (

        <div>

            <div className="row g-5">
                <div className="col-md-8">
                    <h3 className="pb-4 mb-4 fw-bold border-bottom">
                        모두의 일기
                    </h3>
                    <div className="row">
                        {items.map((diary) => (
                            <div className="col-xl-6 text-truncate" key={diary._id}>
                                <a href="#" className="text-decoration-none text-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setDiary(diary)}>
                                    <DiaryPostCard diary={diary} />
                                </a>
                            </div>
                        ))}
                    </div>

                    <nav className="blog-pagination" aria-label="Pagination">
                        <a className="btn btn-outline-primary" href="#">Older</a>
                        <a className="btn btn-outline-secondary disabled">Newer</a>
                    </nav>

                </div>

                <div className="col-md-4">
                    <div className="position-sticky">

                        <div className="p-4">
                            <h4 className="fw-bold">인기 일기</h4>
                            <Calendar onChange={onChange} value={value}
                                formatDay={(locale, date) => moment(date).format("DD")}
                                className="mx-auto w-full text-sm border-b"
                            />
                            <ol className="list-unstyled mt-4">
                                {mostLikersItems.map((diary) => (
                                    <a href="#" className="text-decoration-none text-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setDiary(diary)} key={diary._id} >
                                        <DiaryPostCard diary={diary}/>
                                    </a>
                                )
                                )}
                            </ol>
                        </div>

                        <div className="p-4">
                            <h4 className="fw-bold">Link</h4>
                            <ol className="list-unstyled">
                                <li><a href="#">고객센터</a></li>
                                <li><a href="#">App Download</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{width:'430px'}}>
                        <div className="modal-body bg-dark rounded-3">
                            <DiaryMobileReadView diary={diary} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiarySnsFeedView;