// import logo from '../../logo.svg';
// import '../../App.css';
import { Link } from "react-router-dom";
import Footer from "../../views/common/Footer";
import Header from "../../views/common/Header";
import DiarySnsFeedView from "../../views/diary/DiarySnsFeedView";

const IndexPage = (props) => {
  return (
    <div>
      <Header/>
      <main className="container">
        <DiarySnsFeedView/>
      </main>
      <Footer/>
    </div>
  );
}

export default IndexPage;
