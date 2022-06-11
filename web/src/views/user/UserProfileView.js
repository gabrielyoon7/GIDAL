import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ad from "../../components/common/Ad";
import DiaryPostCard from "../../components/diary/DiaryPostCard";
import Footer from "../common/Footer";
import Header from "../common/Header";
import DiaryMobileReadView from "../diary/read/DiaryMobileReadView";

const UserProfileView = () => {
    const params = useParams();
    const user_id = params.id;
    const [items, setItems] = useState([]);
    const [diary, setDiary] = useState(null);

    const [followersNum, setFollowersNum] = useState(0);
    const [followingsNum, setFollowingsNum] = useState(0);
    const [profileImg, setProfileImg] = useState('');



    useEffect(() => {
        getitems();
        getUserData(user_id);
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

    const getUserData = (user_Id) => {
        axios.post('/usersRouter/findOne', {
            data: {
                user_id: user_Id,
            }
        })
            .then((response) => {
                const following = response.data[0].following;
                const follower = response.data[0].follower;
                const profileImg = response.data[0].profile_image;
                // console.log(following);
                // console.log(follower);
                // console.log(profileImg);
                setFollowingsNum(following.length);
                setFollowersNum(follower.length);
                setProfileImg(profileImg);

            }).catch(function (error) {
                console.log(error);
            });
    };

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
                                    {/* <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns={profileImg} role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"></svg> */}
                                    <img className="bd-placeholder-img rounded-circle" width="140" height="140" src={profileImg}></img>
                                    <h2>{user_id}</h2>
                                    <a href="#" className="stretched-link text-decoration-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        <p className="text-dark">팔로워 {followersNum}명 | 팔로잉 {followingsNum}명</p>
                                        <p className="d-flex justify-content-center">
                                            <a className="btn btn-secondary mx-2" href="#">팔로우</a>
                                            <a className="btn btn-secondary mx-2" href="#">디엠</a>
                                        </p>
                                    </a>
                                </div>
                            </div>

                            {/* <div className="p-4">
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
                            </div> */}

                            {/* <div className="p-4">
                                <h4 className="fw-bold">Elsewhere</h4>
                                <ol className="list-unstyled">
                                    <li><a href="#">GitHub</a></li>
                                    <li><a href="#">Twitter</a></li>
                                    <li><a href="#">Facebook</a></li>
                                </ol>
                            </div> */}
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
            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <Ad />
            </div>
            <Footer />
        </div>
    )
}

export default UserProfileView;