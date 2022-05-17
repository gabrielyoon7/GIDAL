// import logo from '../../logo.svg';
// import '../../App.css';
import { Link } from "react-router-dom";
import Header from "../../views/common/Header";
import MainView from "../../views/main/MainView";

const IndexPage = (props) => {
  return (
    <div>
      <Header/>
      <main className="container">
        <MainView/>
      </main>

      <footer className="blog-footer">
        <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
        <p>
          <Link to="#">Back to top</Link>
        </p>
      </footer>
    </div>
  );
}

export default IndexPage;
