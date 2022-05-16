import {
  Routes,
  Route,
} from "react-router-dom";
import IndexPage from './pages/main/IndexPage'
// import MainPage from './pages/main/MainPage';
// import DataPage from "./pages/data/DataPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage/>} />
      {/* <Route path="main" element={<MainPage />} /> */}
      {/* <Route path="data/:menu" element={<DataPage/>} /> */}
    </Routes>
  );
}

export default App;