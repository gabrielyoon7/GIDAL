import { useState } from "react";
import { Link } from "react-router-dom";
import Ad from "./Ad";

const MobileUI = (props) => {
    const [time, setTime] = useState(new Date());
    const MobileHeader = () => {
        return (
            <div className="d-flex justify-content-between pt-2 px-4" id="status-bar">
                <div className="fw-bold">
                    {time.getHours() < 10 ? "0" : ""}
                    {time.getHours()}
                    {":"}
                    {time.getMinutes() < 10 ? "0" : ""}
                    {time.getMinutes()}
                </div>
                <div>
                    <i className="bi bi-bluetooth"></i>&nbsp;
                    <i className="bi bi-bar-chart-fill"></i>&nbsp;
                    <i className="bi bi-wifi"></i>&nbsp;
                    <i className="bi bi-battery-full"></i>
                </div>
            </div>
        )
    }
    const BackButtonHeader = () => {
        return (
            <div className="px-3 py-2">
                <a href="#">
                    <i className="bi bi-chevron-left"></i>
                </a>
            </div>
        )
    }
    return (
        <>
            <div className='card rounded-3' style={props.style} >
                {/* <!-- 상태바 시작--> */}
                <MobileHeader />
                {/* <!-- 상태바 끝--> */}
                <BackButtonHeader />
                <div>
                    <img src='https://t1.daumcdn.net/cfile/blog/99EC04465C9B308326' style={{ height: '200px', width: '400px' }} />
                </div>
                <div className="p-3">
                    <button className="btn btn-success btn-sm">{props.disclosure}</button>
                    <div className="fs-2 fw-bold">
                        {props.title ? props.title : '제목을 입력하세요'}
                    </div>
                    <div className="my-1">
                        {props.time}
                    </div>
                    <div className="my-1">
                        <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="me-2 rounded-circle" alt="Avatar" style={{ height: '30px' }} />
                        <a href={"/user/"+props.userId}>
                            <strong className="d-inline-block mb-2 text-primary">{props.userId}</strong>
                        </a>
                        <hr></hr>
                    </div>
                    <div className="preview" dangerouslySetInnerHTML={props.createMarkup(props.convertedContent)} style={{ minHeight: '300px' }}></div>
                    <div className="d-flex justify-content-end">
                        <a className="text-decoration-none text-dark" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            댓글 {props.comments}개 좋아요 {props.likes}개
                        </a>
                    </div>
                    <hr></hr>
                    <div className="row d-inline-block ms-1">
                        {props.tags.map((tag) => (
                            <button key={tag} type="button" className="btn btn-outline-success btn-sm disabled me-1 mt-1 col-auto">{tag}</button>
                        ))}
                    </div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <Ad />
            </div>
        </>
    )
}

export default MobileUI;