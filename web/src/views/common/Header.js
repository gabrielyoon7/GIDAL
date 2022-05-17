import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="container">
            <header className="blog-header py-3">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-4 pt-1">
                        <a className="link-secondary" href="https://github.com/gabrielyoon7/GIDAL">고객센터</a>
                    </div>
                    <div className="col-4 text-center">
                    <Link to="/"><div className="blog-header-logo text-dark" href="/">기록의 달인</div></Link>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <a className="btn btn-sm btn-outline-secondary" href="#">로그인</a>
                    </div>
                </div>
            </header>
            <div className="nav-scroller py-1 mb-2">
                {/* 이 부분은 로그인 한 사람에게만 뜨면 좋겠음 */}
                <nav className="nav d-flex justify-content-between">
                    <a className="p-2 link-secondary" href="#">마이다이어리</a>
                    <a className="p-2 link-secondary" href="#">피드</a>
                    <a className="p-2 link-secondary" href="#">통계</a>
                    <a className="p-2 link-secondary" href="#">할일</a>
                    <a className="p-2 link-secondary" href="#">설정</a>
                </nav>
            </div>
        </div>

    )
}
export default Header;