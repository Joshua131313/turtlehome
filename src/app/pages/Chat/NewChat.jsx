import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from './elements/Toolbar';
import { NewChatHeader } from './elements/NewChatHeader';

const NewChat = props => {
    const [message, setMessage] = useState('')
    const [chatUsers, setChatUsers] = useState([])
    return (
        <div className='newchat'>
            <NewChatHeader chatUsers={chatUsers} setChatUsers={setChatUsers}/>
            <Toolbar message={message} setMessage={setMessage}/>
        </div>
    );
};

NewChat.propTypes = {
    
};

export default NewChat;