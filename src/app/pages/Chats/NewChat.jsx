import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import './Chats.css'

const NewChat = props => {
    return (
        <div className='newchat'>
            
            <Outlet />
        </div>
    );
};

NewChat.propTypes = {
    
};

export default NewChat;