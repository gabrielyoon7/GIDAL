import ErrorBoundary from "../../ErrorBoundary";
import DiarySnsFeedView from "../sns/DiarySnsFeedView";
import WelcomeView from "./WelcomeView";

const MainView = () => {
    return (
        <div>
            <WelcomeView />
            <DiarySnsFeedView/>
        </div>
    )
}

export default MainView;