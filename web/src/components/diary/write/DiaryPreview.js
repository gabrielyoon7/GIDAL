import { useEffect, useState } from "react";
import MobileUI from "../../common/MobileUI";

const DiaryPreview = (props) => {




    return (
        <div className='diaryPreview my-3 '>
            <div className="fw-bold h3">
                일기 미리보기
            </div>
            <MobileUI
                style={{
                    width: "400px",
                    minHeight: "800px"
                }}
                disclosure={props.disclosure}
                title={props.title}
                time={props.time.toDateString()}
                userId={props.userId}
                convertedContent={props.convertedContent}
                createMarkup={props.createMarkup}
                likes={99}
                comments={99}
                tags={[]}
            />
        </div>
    )
}

export default DiaryPreview;
