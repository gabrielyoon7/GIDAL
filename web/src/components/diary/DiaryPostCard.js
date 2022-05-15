const DiaryPostCard = (props) => {

        // 정규식을 이용한 HTML 태그 제거 시작
        let content = props.diary.content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
        content = content.replace(/<br\/>/ig, "\n");
        content = content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
        content = content.replace(/(<([^>]+)>)/gi, "");
        content = content.replace(/&nbsp;/gi, "");
        // 정규식을 이용한 HTML 태그 제거 끝

    return (
        <article className="blog-post">
            <h2 className="blog-post-title">{props.diary.title}</h2>
            <p className="blog-post-meta">{props.diary.date} by <a href="#">{props.diary.user_id}</a></p>
            <p>{content}</p>
            <hr></hr>
        </article>
    )
}
export default DiaryPostCard;