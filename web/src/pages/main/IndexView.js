// import logo from '../../logo.svg';
// import '../../App.css';
import { Link } from "react-router-dom";

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
              <a className="link-secondary" href="#" aria-label="Search">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5" /><path d="M21 21l-5.2-5.2" /></svg> */}
              </a>
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
            <a className="p-2 link-secondary" href="#">Politics</a>
            <a className="p-2 link-secondary" href="#">Opinion</a>
            <a className="p-2 link-secondary" href="#">Science</a>
            <a className="p-2 link-secondary" href="#">Health</a>
            <a className="p-2 link-secondary" href="#">Style</a>
            <a className="p-2 link-secondary" href="#">Travel</a>
          </nav>
        </div>
      </div>

      <main className="container">

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