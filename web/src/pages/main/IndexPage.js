// import logo from '../../logo.svg';
// import '../../App.css';
import { Link, useParams } from "react-router-dom";
import Footer from "../../views/common/Footer";
import Header from "../../views/common/Header";
import DiaryReadView from "../../views/diary/read/DiaryReadView";
import DirayWriteView from "../../views/diary/write/DirayWriteView";

import MainView from "../../views/main/MainView";
import DiarySnsFeedView from "../../views/sns/DiarySnsFeedView";


const data = {
  undefined: {
    html: <MainView />,
  },  
  home: {
    html: <MainView />,
  },
  write:{
    html: <DirayWriteView/>,
  },
  // read:{
  //   html: <DiaryReadView/>,
  // },
  sns: {
    html: <DiarySnsFeedView />,
  },
};


const IndexPage = (props) => {
  const params = useParams();
  const menu = data[params.menu];

  return (
    <div>
      <Header />
      <main className="container">
        {/* <MainView/> */}
        {menu ? (
          <>
            {menu.html}
          </>
        ) : (
          <p>존재하지 않는 메뉴입니다.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default IndexPage;
