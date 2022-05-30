import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Ad from '../../components/common/Ad';
import Login from "./Login";
import SignUp from "./SignUp";

const Header = () => {
    const [isLogin, setIsLogin] = useState(false)
    const userId = sessionStorage.getItem("Id");

    // console.log(sessionStorage.getItem("Id"));

    useEffect(() => {
        if (sessionStorage.getItem("Id") == null) {
            setIsLogin(false)
        } else {
            setIsLogin(true)
        }
    })

    const logout = () => {
        sessionStorage.clear('Id')
        window.location.reload();
    }

    return (
        <div className="container">
            <header className="blog-header py-3">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-4 pt-1">
                        <a className="link-secondary" href="https://github.com/gabrielyoon7/GIDAL">고객센터</a>
                    </div>
                    <div className="col-4 text-center h1">
                        <Link to="/" className='text-decoration-none'><div className="blog-header-logo text-dark fw-bold" href="/">기달</div></Link>
                    </div>
                    {/* <!-- Button trigger modal --> */}
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        {
                            isLogin
                                ?
                                <div>
                                    <div className="dropdown">
                                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-person-circle"></i>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                            <li><a className="dropdown-item" href={"/user/" + userId}>{userId}</a></li>
                                            <li><a className="dropdown-item" href="/write">일기 작성하기</a></li>
                                            <li><a className="dropdown-item" onClick={() => logout()}>로그아웃</a></li>
                                        </ul>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="dropdown">
                                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-box-arrow-in-right"></i>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                            <li><a className="dropdown-item active" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">로그인</a></li>
                                            <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#signupModal">회원가입</a></li>
                                        </ul>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </header>
            {
                isLogin
                    ?
                    <div className="nav-scroller py-1 mb-2">
                        {/* 이 부분은 로그인 한 사람에게만 뜨면 좋겠음 */}
                        <nav className="nav d-flex justify-content-between">
                            <Link className="p-2 link-secondary" to={"/user/" + userId}>마이 다이어리</Link>
                            <Link className="p-2 link-secondary" to="/sns">모두의 일기</Link>
                            <a href="#" className="p-2 link-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">할 일 / 통계</a>
                            <Link className="p-2 link-secondary" to="/write">일기 작성하기</Link>
                        </nav>
                    </div>
                    :
                    <div></div>
            }
            {/* <!-- Login Modal --> */}
            <div className="modal fade" id="loginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">로그인</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {!isLogin &&
                            <Login />}

                    </div>
                </div>
            </div>

            {/* <!-- Sign up Modal --> */}
            <div className="modal fade" id="signupModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="signupModalLabel">회원가입</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {!isLogin &&
                            <SignUp />}
                    </div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <Ad />
            </div>
        </div>
    )
}
export default Header;