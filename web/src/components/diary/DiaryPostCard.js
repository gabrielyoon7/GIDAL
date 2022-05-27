import { Link } from "react-router-dom";

const DiaryPostCard = ({ diary }) => {

    // 정규식을 이용한 HTML 태그 제거 시작
    let content = diary.content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    content = content.replace(/<br\/>/ig, "\n");
    content = content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    content = content.replace(/(<([^>]+)>)/gi, "");
    content = content.replace(/&nbsp;/gi, "");
    // 정규식을 이용한 HTML 태그 제거 끝

    return (
        <Link to={"/read/"+diary._id} className="text-decoration-none text-dark">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <div className="d-flex justify-content-between">
                        <strong className="d-inline-block mb-2 text-primary">{diary.user_id}</strong>
                        <div className="mb-1 text-muted">{diary.date}</div>
                    </div>
                    <h3 className="mb-0">{diary.title}</h3>
                    <p className="card-text mb-auto">{content}</p>
                    <div className="d-flex justify-content-between">
                        <strong className="d-inline-block mb-2 text-primary">태그 태그</strong>
                        <div className="mb-1 text-muted">댓글 좋아요</div>
                    </div>
                </div>
            </div>
        </Link>
        // <div className="blog-post" onClick={readDiary} >
        //     <h2 className="blog-post-title">{diary.title}</h2>
        //     <p className="blog-post-meta">{diary.date} by <a href={"user/"+diary.user_id}>{diary.user_id}</a></p>
        //     <p>{content}</p>
        //     <hr></hr>
        // </div>
    )
}
export default DiaryPostCard;