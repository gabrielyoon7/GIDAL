import { Link } from "react-router-dom";
import Ad from "../../components/common/Ad";

const WelcomeView = () => {
    return (
        <div>
            <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 fw-bold">기록의 달인</h1>
                    <p className="lead my-3">차세대 일기 작성 플랫폼</p>
                    <p className="lead my-3">기존의 오래된 불편한 일기 작성에서 벗어나 SNS를 도입하여 일기를 쓰는 것에 흥미를 유도하고, 통계 기능으로 한 사람의 인생을 상세히 기록할 수 있도록 하는 애플리케이션입니다.</p>
                    <p className="lead mb-0"><a href="#" className="text-white fw-bold">경기대학교 컴퓨터공학부 목123</a></p>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <div className="d-flex justify-content-between">
                                <strong className="d-inline-block mb-2 text-primary">SNS</strong>
                                <div className="mb-1 text-muted">Web / App</div>
                            </div>
                            <h3 className="mb-0">모두의 일기</h3>
                            <p className="card-text mb-auto">다른 사람들의 일기를 훔쳐보아요</p>
                            <Link to="sns" className="stretched-link">바로 가기</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <div className="d-flex justify-content-between">
                                <strong className="d-inline-block mb-2 text-success">통계</strong>
                                <div className="mb-1 text-muted">App Only</div>
                            </div>
                            <h3 className="mb-0">태그 통계</h3>
                            <p className="mb-auto">내 일기를 통계로 확인해보아요.</p>
                            {/* <a href="#" className="stretched-link">앱 다운로드 받기</a> */}
                            <a href="#" className="stretched-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                앱 다운로드 받기
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <Ad/>
            </div>
        </div>
    )
}

export default WelcomeView;