import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { User } from '../../User/User';
import PostBtn from '../../AppBtn/PostBtn';
import ReactTextareaAutosize from 'react-textarea-autosize';
import UploadMedia from '../../AppBtn/UploadMedia';

const CommentInput = props => {
    const {onClick, value, setValue, text, placeholder='Write a comment...', loading} = props
    const [files, setFiles] = useState([])
    const handleEnter = (e) => {
        if(e.key === 'Enter') {
            onClick(files)
            setFiles([])
        }
    }

    return (
        <div className="commentinput flexrow">
            <User showName={false} /> 
            <div className='inputcont flexcol'>
                <ReactTextareaAutosize type="text" placeholder={placeholder} onKeyUp={(e)=> handleEnter(e)} value={value} onChange={e=> setValue(e.target.value)}/>
                <div className="flexrow inputcommentcontrols sb">
                    <UploadMedia files={files} setFiles={setFiles} limit={1}/>
                    <PostBtn loading={loading} text={text} value={value} onClick={()=> {onClick(files); setFiles([])}}/>
                </div>
            </div>
         </div>
    );
};

CommentInput.propTypes = {
    
};

export default CommentInput;