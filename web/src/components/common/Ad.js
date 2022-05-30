const Ad = () => {
    return (
        // <div className="modal modal-tour position-static d-block bg-secondary py-5" tabindex="-1" role="dialog" id="modalTour">
        <div className="modal-dialog" role="document">
            <div className="modal-content rounded-4 shadow">
                <div className="modal-body p-5">
                    <h2 className="fw-bold mb-0">App을 다운로드 하세요</h2>

                    <ul className="d-grid gap-4 my-5 list-unstyled">
                        <li className="d-flex gap-4">
                            <i className="bi bi-star-fill"></i>
                            <div>
                                <h5 className="mb-0">일기 작성 기능</h5>
                                일기에 관련된 모든 기능이 활성화 됩니다.
                            </div>
                        </li>
                        <li className="d-flex gap-4">
                            <i className="bi bi-star-fill"></i>
                            <div>
                                <h5 className="mb-0">할 일</h5>
                                앱에서 사용하시면 할 일을 관리해드려요.
                            </div>
                        </li>
                        <li className="d-flex gap-4">
                            <i className="bi bi-star-fill"></i>
                            <div>
                                <h5 className="mb-0">통계</h5>
                                일기와 할 일을 통계로 내드려요.
                            </div>
                        </li>
                        <li className="d-flex gap-4">
                            <i className="bi bi-star-fill"></i>
                            <div>
                                <h5 className="mb-0">나머지 모든 기능</h5>
                                앱에서 사용하시면 이외 모든 기능이 활성화 됩니다.
                            </div>
                        </li>
                    </ul>
                    <button type="button" className="btn btn-lg btn-primary mt-5 w-100" data-bs-dismiss="modal">괜찮아요!</button>
                </div>
            </div>
        </div>
        // </div>
    )
}

export default Ad;