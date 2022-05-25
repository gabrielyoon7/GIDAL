import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './App.css';
const DirayWriteView = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }

  const onClickEvent = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    alert(currentContentAsHTML)
  }

  return (
    <div className="mt-3">
      <div className='row'>
        <div className='col-lg-6'>
          <div className='diaryEditor my-3'>
            <div className="fw-bold h3">
              일기 작성하기
            </div>
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
            <button onClick={onClickEvent}>작성하기</button>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='diaryPreview my-3'>
            <div className="fw-bold h3">
              일기 미리보기
            </div>
            <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DirayWriteView;