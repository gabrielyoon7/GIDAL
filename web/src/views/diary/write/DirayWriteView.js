import React, { useEffect, useState } from 'react';
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
  const userId = sessionStorage.getItem("Id");
  const [convertedContent, setConvertedContent] = useState(null);
  const [title, setTitle] = useState('');
  const [disclosure, setDisclosure] = React.useState('public');
  const [time, setTime] = useState(new Date());
  useEffect(()=>{
    console.log(disclosure)
  }, [disclosure])

  const handleTitleChange = (state) => {
    // console.log(state.target.value);
    setTitle(state.target.value);
  };
  const handleDisclosureChange = (state) => {
    console.log(state.target.value);
    setDisclosure(state.target.value);
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
    axios.post('/diariesRouter/save', {
      data: {
        user_id: userId,
        date: new Date(),
        title: title,
        content: currentContentAsHTML,
        disclosure: disclosure,
        tags: [],
      }
    }).then((response) => {
      if (response.data.status === 'success') {
        alert('잘 등록 됨')
      }
      else(
        alert('에러 발생')
      )
    }).catch(function (error) {
      console.log(error);
    })
  };

  return (
    <div className="mt-3">
      <div className='row'>
        <div className='col-lg-6'>
          <DiaryEditor handleTitleChange={handleTitleChange} handleDisclosureChange={handleDisclosureChange} disclosure={disclosure} editorState={editorState} handleEditorChange={handleEditorChange} />
        </div>
        <div className='col-lg-6'>
          <DiaryPreview userId={userId} title={title} disclosure={disclosure} time={time} createMarkup={createMarkup} convertedContent={convertedContent} />
        </div>
        <button className='btn btn-success' onClick={saveDiary}>작성하기</button>
      </div>
    </div>
  )
}
export default DirayWriteView;