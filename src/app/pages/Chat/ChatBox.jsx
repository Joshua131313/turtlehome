import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from './elements/Toolbar';

const ChatBox = props => {
    return (
        <div className='chatbox'>
            
            <Toolbar />
        </div>
    );
};

ChatBox.propTypes = {
    
};

export default ChatBox;