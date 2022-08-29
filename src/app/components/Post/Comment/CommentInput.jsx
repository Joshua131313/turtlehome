import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../../User/User';
import PostBtn from '../../AppBtn/PostBtn';
import ReactTextareaAutosize from 'react-textarea-autosize';

const CommentInput = props => {
    const {onClick, value, setValue, text, placeholder='Write a comment...'} = props

    const handleEnter = (e) => {
        if(e.key === 'Enter') {
            onClick()
        }
    }

    return (
        <div className="commentinput flexrow">
            <User showName={false} /> 
            <div className='inputcont flexcol'>
                <ReactTextareaAutosize type="text" placeholder={placeholder} onKeyUp={(e)=> handleEnter(e)} value={value} onChange={e=> setValue(e.target.value)}/>
                <div className="flexrow inputcommentcontrols sb">
                    
                    <PostBtn text={text} value={value} onClick={()=> onClick()}/>
                </div>
            </div>
         </div>
    );
};

CommentInput.propTypes = {
    
};

export default CommentInput;