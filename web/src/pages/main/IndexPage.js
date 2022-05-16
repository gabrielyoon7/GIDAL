// import logo from '../../logo.svg';
// import '../../App.css';
import { Link } from "react-router-dom";
import Header from "../../views/common/Header";
import MainView from "../../views/main/MainView";

const IndexPage = (props) => {
  return (
    <div style={tempStyle}>
      <div className="container">
        <Header/>

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

      <main className="container">
        <MainView/>
      </main>

      <footer className="blog-footer">
        <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
        <p>
          <a href="#">Back to top</a>
        </p>
      </footer>
    </div>
  );
}

export default IndexPage;


const tempStyle = {

}