import React from 'react';
import PropTypes from 'prop-types';
import ReactTextareaAutosize from 'react-textarea-autosize';
import './AppInput.css'

const TextArea = props => {
    return (
       <ReactTextareaAutosize {...props}/>
    );
};

TextArea.propTypes = {
    
}; 

export default TextArea;