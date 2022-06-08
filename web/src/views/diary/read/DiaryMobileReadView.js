import DOMPurify from "dompurify";
import MobileUI from "../../../components/common/MobileUI";

const DiaryMobileReadView = (props) => {

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    };

    return (
        <>
            {
                props.diary
                &&
                <MobileUI
                    style={{
                        width: "400px",
                        minHeight: "800px"
                    }}
                    disclosure={props.diary.disclosure}
                    title={props.diary.title}
                    time={props.diary.date.slice(0, 10)}
                    userId={props.diary.user_id}
                    convertedContent={props.diary.content}
                    createMarkup={createMarkup}
                    likes={props.diary.likers.length}
                    comments={props.diary.comments.length}
                />
            }
        </>

    )
}
export default DiaryMobileReadView;