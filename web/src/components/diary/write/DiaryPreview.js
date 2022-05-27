const DiaryPreview = (props) => {
    return (
        <div className='diaryPreview my-3 '>
            <div className="fw-bold h3">
                일기 미리보기
            </div>
            <div className='card rounded-3' style={style} >
                {/* <!-- 상태바 시작--> */}
                <div className="d-flex justify-content-between pt-2 px-4" id="status-bar">
                    <div><b>12:00</b></div>
                    <div>
                        <i className="bi bi-bluetooth"></i>
                        <i className="bi bi-bar-chart-fill"></i>
                        <i className="bi bi-wifi"></i>
                        <i className="bi bi-battery-full"></i>
                    </div>
                </div>
                {/* <!-- 상태바 끝--> */}
                <div>
                    {props.title}
                </div>
                <div className="preview" dangerouslySetInnerHTML={props.createMarkup(props.convertedContent)}></div>
            </div>
        </div>
    )
}

export default DiaryPreview;

const style = { 
    maxWidth:"400px",
    minHeight:"300px"
}
