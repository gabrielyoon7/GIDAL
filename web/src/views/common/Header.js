import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
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
                        <Link to="/" className='text-decoration-none'><div className="blog-header-logo text-dark" href="/">기록의 달인</div></Link>
                    </div>
                    {/* <div className="col-4 d-flex justify-content-end align-items-center">
                        <a className="btn btn-sm btn-outline-secondary" href="#">로그인</a>
                    </div> */}
                    {/* <!-- Button trigger modal --> */}
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        {
                            isLogin
                                ?
                                <div>
                                    <a className="p-2 link-secondary" href="#">{userId}</a>님 안녕하세요
                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => logout()}>
                                        로그아웃
                                    </button>
                                </div>
                                :
                                <div>
                                    <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#loginModal">
                                        로그인
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#signupModal">
                                        회원가입
                                    </button>
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
                            <a className="p-2 link-secondary" href="#">마이다이어리</a>
                            <a className="p-2 link-secondary" href="sns">피드</a>
                            <a className="p-2 link-secondary" href="#">통계</a>
                            <a className="p-2 link-secondary" href="#">할일</a>
                            <a className="p-2 link-secondary" href="#">설정</a>
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
        </div>

    )
}
export default Header;