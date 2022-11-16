import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import ChatSidebar from './ChatSidebar';
import './Chat.css'
import DynamicLayout from '../../containers/DynamicLayout/DynamicLayout';

const Chat = props => {
    
    return (
        <DynamicLayout bodyClassName='onchatpage' className='chat'>
            <ChatSidebar />
            <Outlet />
        </DynamicLayout>
    );
};

Chat.propTypes = {
    
};

export default Chat;