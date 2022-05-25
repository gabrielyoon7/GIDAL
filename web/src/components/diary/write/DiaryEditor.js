import { Editor } from 'react-draft-wysiwyg';
import './App.css';
const DiaryEditor = (props) => {
    return (
        <div className='diaryEditor my-3'>
            <div className="fw-bold h3">
                일기 작성하기
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">제목</span>
                <input type="text" className="form-control" placeholder="제목을 입력하세요" aria-label="제목을 입력하세요" aria-describedby="basic-addon1" onChange={props.handleTitleChange}/>
            </div>
            <Editor
                editorState={props.editorState}
                onEditorStateChange={props.handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
        </div>
    )
}
export default DiaryEditor;