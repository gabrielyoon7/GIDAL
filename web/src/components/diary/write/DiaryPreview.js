import { useEffect, useState } from "react";

const DiaryPreview = (props) => {

    const [time, setTime] = useState(new Date());


    return (
        <div className='diaryPreview my-3 '>
            <div className="fw-bold h3">
                일기 미리보기
            </div>
            <div className='card rounded-3' style={style} >
                {/* <!-- 상태바 시작--> */}
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
                {/* <!-- 상태바 끝--> */}
                <div className="px-3 py-2">
                    <a href="#">
                        <i className="bi bi-chevron-left"></i>
                    </a>
                </div>
                <div>
                    <img src='https://t1.daumcdn.net/cfile/blog/99EC04465C9B308326' style={{ height: '200px', width: '400px' }} />
                </div>
                <div className="p-3">
                    <button className="btn btn-success btn-sm">{props.disclosure}</button>
                    <div className="fs-2 fw-bold">
                        {props.title ? props.title : '제목을 입력하세요'}
                    </div>
                    <div className="my-1">
                        {time.toTimeString()}
                    </div>
                    <div className="my-1">
                        <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="me-2 rounded-circle" alt="Avatar" style={{ height: '30px' }} />
                        <strong className="d-inline-block mb-2 text-primary">{props.userId}</strong>
                        <hr></hr>
                    </div>
                    <div className="preview" dangerouslySetInnerHTML={props.createMarkup(props.convertedContent)} style={{ minHeight: '300px' }}></div>
                    <div className="d-flex justify-content-end">
                        댓글 99개 좋아요 99개
                    </div>
                    <hr></hr>
                </div>
            </div>
        </div>
    )
}

export default DiaryPreview;

const style = {
    width: "400px",
    minHeight: "800px"
}
