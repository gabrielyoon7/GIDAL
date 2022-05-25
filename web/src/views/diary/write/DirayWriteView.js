import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DiaryEditor from '../../../components/diary/write/DiaryEditor.js';
import DiaryPreview from '../../../components/diary/write/DiaryPreview.js';
import axios from 'axios';
const DirayWriteView = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const [title, setTitle] = useState('');
  const handleTitleChange = (state) => {
    console.log(state.target.value);
  };
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  };
  const saveDiary = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    alert(currentContentAsHTML);
    // axios.post(config.ip + ':5000/diariesRouter/save', {
    //   data: {
    //     user_id: userId,
    //     date: Date,
    //     title: Title,
    //     content: Content,
    //     disclosure: disclosure,
    //     tags: tagTextOnlyArray,
    //   }
    // }).then((response) => {
    //   if (response.data.status === 'success') {
    //     axios.post(config.ip + ':5000/tagsRouter/save', {
    //       data: makeTagLog(response.data.id)
    //     }).then((response) => {
    //       if (response.data.status === 'success') {
    //         props.navigation.pop();
    //         // 스택 쌓지 않고 화면 이동 => 읽기 페이지에서 뒤로가기하면 리스트 페이지 뜸
    //       }
    //     }).catch(function (error) {
    //       console.log(error);
    //     })
    //   }
    // }).catch(function (error) {
    //   console.log(error);
    // })
  };

  return (
    <div className="mt-3">
      <div className='row'>
        <div className='col-lg-6'>
          <DiaryEditor handleTitleChange={handleTitleChange} editorState={editorState} handleEditorChange={handleEditorChange} />
        </div>
        <div className='col-lg-6'>
          <DiaryPreview title={title} createMarkup={createMarkup} convertedContent={convertedContent} />
        </div>
        <button onClick={saveDiary}>작성하기</button>
      </div>
    </div>
  )
}
export default DirayWriteView;