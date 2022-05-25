const DiaryPreview = (props) => {
    return (
        <div className='diaryPreview my-3'>
            <div className="fw-bold h3">
                일기 미리보기
            </div>
            <div>
                {props.title}
            </div>
            <div className="preview" dangerouslySetInnerHTML={props.createMarkup(props.convertedContent)}></div>
        </div>
    )
}

export default DiaryPreview;