import {
  Routes,
  Route,
} from "react-router-dom";
import IndexPage from './pages/main/IndexPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage/>} />
      <Route path="/:menu" element={<IndexPage/>} />
    </Routes>
  );
}

export default App;