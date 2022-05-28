import { Editor } from 'react-draft-wysiwyg';
import './App.css';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const DiaryEditor = (props) => {
    const DiaryDisclosure = () => {
        return (
            <div className='d-flex justify-content-around my-2'>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="public" onChange={props.handleDisclosureChange} checked={props.disclosure==='public'} />
                    <label className="form-check-label" htmlFor="inlineRadio1">전체공개</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="private" onChange={props.handleDisclosureChange} checked={props.disclosure==='private'} />
                    <label className="form-check-label" htmlFor="inlineRadio2">나만보기</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="friends" onChange={props.handleDisclosureChange} checked={props.disclosure==='friends'} />
                    <label className="form-check-label" htmlFor="inlineRadio3">친구공개</label>
                </div>
            </div>
        )
    }
    const TagSelector =()=>{
        return(
            <div>
                
            </div>
        )
    }
    return (
        <div className='diaryEditor my-3'>
            <div className="fw-bold h3">
                일기 작성하기
            </div>
            <TagSelector/>
            <div className="input-group my-3">
                <span className="input-group-text" id="basic-addon1">제목</span>
                <input type="text" className="form-control" placeholder="제목을 입력하세요" aria-label="제목을 입력하세요" aria-describedby="basic-addon1" onChange={props.handleTitleChange} />
            </div>
            <Editor
                editorState={props.editorState}
                onEditorStateChange={props.handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
            <DiaryDisclosure />
        </div>
    )
}
export default DiaryEditor;