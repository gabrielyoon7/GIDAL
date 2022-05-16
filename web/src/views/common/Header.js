const Header = () =>{
    return(
        <header className="blog-header py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1">
              <a className="link-secondary" href="https://github.com/gabrielyoon7/GIDAL">고객센터</a>
            </div>
            <div className="col-4 text-center">
              <a className="blog-header-logo text-dark" href="/">기록의 달인</a>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <a className="btn btn-sm btn-outline-secondary" href="#">로그인</a>
            </div>
          </div>
        </header>
    )
}
export default Header;