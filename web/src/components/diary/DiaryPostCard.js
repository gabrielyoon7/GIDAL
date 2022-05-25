const DiaryPostCard = (props) => {

        // 정규식을 이용한 HTML 태그 제거 시작
        let content = props.diary.content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
        content = content.replace(/<br\/>/ig, "\n");
        content = content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
        content = content.replace(/(<([^>]+)>)/gi, "");
        content = content.replace(/&nbsp;/gi, "");
        // 정규식을 이용한 HTML 태그 제거 끝

        const readDiary = (e) => {
            window.location.href = "/read"
        }
    return (
        <div className="blog-post" onClick={readDiary}>
            <h2 className="blog-post-title">{props.diary.title}</h2>
            <p className="blog-post-meta">{props.diary.date} by <a href={"user/"+props.diary.user_id}>{props.diary.user_id}</a></p>
            <p>{content}</p>
            <hr></hr>
        </div>
    )
}
export default DiaryPostCard;