import { Link } from "react-router-dom";
import DiaryMobileReadView from "../../views/diary/read/DiaryMobileReadView";

const DiaryPostCard = ({ diary }) => {

    // 정규식을 이용한 HTML 태그 제거 시작
    let content = diary.content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    content = content.replace(/<br\/>/ig, "\n");
    content = content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    content = content.replace(/(<([^>]+)>)/gi, "");
    content = content.replace(/&nbsp;/gi, "");
    // 정규식을 이용한 HTML 태그 제거 끝

    return (
        <>
            {/* <Link to={"/read/" + diary._id} className="text-decoration-none text-dark"> */}
            {/* <a href="#" className="text-decoration-none text-dark" data-bs-toggle="modal" data-bs-target="#exampleModal"> */}
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <div className="d-flex justify-content-between">
                        <div>
                            <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="me-2 rounded-circle" alt="Avatar" style={{ height: '30px' }} />
                            <strong className="d-inline-block mb-2 text-primary">{diary.user_id}</strong>
                        </div>
                        <div className="mb-1 text-muted">{diary.date.substr(0, 10)}</div>
                    </div>
                    <h3 className="mb-0">{diary.title}</h3>
                    <p className="card-text mb-auto">{content}</p>
                    <div className="d-flex justify-content-between">
                        {/* <strong className="d-inline-block mb-2 text-primary">태그 태그</strong> */}
                        <div className="row d-inline-block ms-1">
                            {diary.tags.slice(0, 3).map((tag) => (
                                <button key={tag} type="button" className="btn btn-outline-success btn-sm disabled me-1 mt-1 col-auto">{tag}</button>
                            ))}
                        </div>
                        <div className="text-muted row">
                            <p className="col-auto"><i className="bi bi-chat-right-text me-2"></i>{diary.comments.length}</p>
                            <p className="col-auto"><i className="bi bi-heart me-2"></i>{diary.likers.length}</p>
                            {/* 좋아요 댓글 */}
                        </div>
                    </div>
                </div>
            </div>
            {/* </a> */}
        </>
    )
}
export default DiaryPostCard;