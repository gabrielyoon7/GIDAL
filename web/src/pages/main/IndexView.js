// import logo from '../../logo.svg';
// import '../../App.css';
import { Link } from "react-router-dom";
import MainView from "../../views/main/MainView";

const IndexView = (props) => {
  return (
    <div style={tempStyle}>
      <div className="container">
        <header className="blog-header py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1">
              <a className="link-secondary" href="#">Subscribe</a>
            </div>
            <div className="col-4 text-center">
              <a className="blog-header-logo text-dark" href="#">Large</a>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <a className="btn btn-sm btn-outline-secondary" href="#">Sign up</a>
            </div>
          </div>
        </header>

        <div className="nav-scroller py-1 mb-2">
          <nav className="nav d-flex justify-content-between">
            <a className="p-2 link-secondary" href="#">World</a>
            <a className="p-2 link-secondary" href="#">U.S.</a>
            <a className="p-2 link-secondary" href="#">Technology</a>
            <a className="p-2 link-secondary" href="#">Design</a>
            <a className="p-2 link-secondary" href="#">Culture</a>
            <a className="p-2 link-secondary" href="#">Business</a>
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

export default IndexView;


const tempStyle = {

}