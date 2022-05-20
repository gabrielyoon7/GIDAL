import {
  Routes,
  Route,
} from "react-router-dom";
import IndexPage from './pages/main/IndexPage'
import UserProfileView from "./views/user/UserProfileView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage/>} />
      <Route path="/:menu" element={<IndexPage/>} />
      <Route path="/user/:id" element={<UserProfileView/>} />
    </Routes>
  );
}

export default App;