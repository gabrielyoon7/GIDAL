import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DiaryPostCard from "../../components/diary/DiaryPostCard";
import Footer from "../common/Footer";
import Header from "../common/Header";
import DiaryMobileReadView from "../diary/read/DiaryMobileReadView";

const UserProfileView = () => {
    const params = useParams();
    const user_id = params.id;
    const [items, setItems] = useState([]);
    const [diary, setDiary] = useState(null);

    useEffect(() => {
        getitems();
    }, []);

    const getitems = () => {
        let result = []
        axios.post('/diariesRouter/findOwn', {
            data: {
                user_id: user_id
            }
        }).then((response) => {
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

    return (
        <div>
            <Header />
            <main className="container">
                <div className="row g-5">
                    <div className="col-md-8">
                        <h3 className="pb-4 mb-4 fw-bold border-bottom">
                            {user_id}의 일기
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
                            {/* <div> */}
                            <div className="p-4 mb-3 bg-light rounded">
                                <div className="col text-center">
                                    <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777" /><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
                                    <h2>{user_id}</h2>
                                    <p>팔로우 00명 팔로워 00명</p>
                                    <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
                                </div>
                            </div>

                            <div className="p-4">
                                <h4 className="fw-bold">Archives</h4>
                                <ol className="list-unstyled mb-0">
                                    <li><a href="#">March 2021</a></li>
                                    <li><a href="#">February 2021</a></li>
                                    <li><a href="#">January 2021</a></li>
                                    <li><a href="#">December 2020</a></li>
                                    <li><a href="#">November 2020</a></li>
                                    <li><a href="#">October 2020</a></li>
                                    <li><a href="#">September 2020</a></li>
                                    <li><a href="#">August 2020</a></li>
                                    <li><a href="#">July 2020</a></li>
                                    <li><a href="#">June 2020</a></li>
                                    <li><a href="#">May 2020</a></li>
                                    <li><a href="#">April 2020</a></li>
                                </ol>
                            </div>

                            <div className="p-4">
                                <h4 className="fw-bold">Elsewhere</h4>
                                <ol className="list-unstyled">
                                    <li><a href="#">GitHub</a></li>
                                    <li><a href="#">Twitter</a></li>
                                    <li><a href="#">Facebook</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ width: '430px' }}>
                        <div className="modal-body bg-dark rounded-3">
                            <DiaryMobileReadView diary={diary} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserProfileView;