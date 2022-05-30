import { Editor } from 'react-draft-wysiwyg';
import './App.css';
// import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';
import Ad from '../../common/Ad';
const DiaryEditor = (props) => {
    const DiaryDisclosure = () => {
        return (
            <div className='d-flex justify-content-around my-2'>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="public" onChange={props.handleDisclosureChange} checked={props.disclosure === 'public'} />
                    <label className="form-check-label" htmlFor="inlineRadio1">전체공개</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="private" onChange={props.handleDisclosureChange} checked={props.disclosure === 'private'} />
                    <label className="form-check-label" htmlFor="inlineRadio2">나만보기</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="friends" onChange={props.handleDisclosureChange} checked={props.disclosure === 'friends'} />
                    <label className="form-check-label" htmlFor="inlineRadio3">친구공개</label>
                </div>
            </div>
        )
    }
    const TagSelector = () => {
        return (
            <div className="text-center card rounded-3 h-100" >
                <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    태그 선택기 실행하기
                </a>
            </div>
        )
    }
    return (
        <div className='diaryEditor my-3'>
            <div className="fw-bold h3">
                일기 작성하기
            </div>
            <TagSelector />
            <div className="input-group my-3">
                <span className="input-group-text" id="basic-addon1">제목</span>
                <input type="text" className="form-control" placeholder="제목을 입력하세요" aria-label="제목을 입력하세요" aria-describedby="basic-addon1" onChange={props.handleTitleChange} />
            </div>
            <MyBlock>
                <Editor
                    editorState={props.editorState}
                    onEditorStateChange={props.handleEditorChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                />
            </MyBlock>
            <DiaryDisclosure />
            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <Ad />
            </div>
        </div>
    )
}
export default DiaryEditor;

const MyBlock = styled.div`
  .editor-class {
    height: 400px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
  }
`;