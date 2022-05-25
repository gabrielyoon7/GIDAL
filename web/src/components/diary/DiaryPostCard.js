const DiaryPostCard = ({diary, readDiary}) => {

        // 정규식을 이용한 HTML 태그 제거 시작
        let content = diary.content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
        content = content.replace(/<br\/>/ig, "\n");
        content = content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
        content = content.replace(/(<([^>]+)>)/gi, "");
        content = content.replace(/&nbsp;/gi, "");
        // 정규식을 이용한 HTML 태그 제거 끝

    return (
        <div className="blog-post" onClick={readDiary} >
            <h2 className="blog-post-title">{diary.title}</h2>
            <p className="blog-post-meta">{diary.date} by <a href={"user/"+diary.user_id}>{diary.user_id}</a></p>
            <p>{content}</p>
            <hr></hr>
        </div>
    )
}
export default DiaryPostCard;