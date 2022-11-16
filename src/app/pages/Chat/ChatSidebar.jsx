import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ChatSidebar = props => {
    return (
        <div className='chatsidebar'>
            <div className="chattitle flexrow sb">
                <h3>Chat</h3>
                <Link to='new-chat'>
                  <i className='fal fa-edit'></i>
                </Link>
            </div>
        </div>
    );
};

ChatSidebar.propTypes = {
    
};

export default ChatSidebar;