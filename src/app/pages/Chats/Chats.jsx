import React from 'react';
import PropTypes from 'prop-types';
import './Chats.css'
import { Outlet } from 'react-router-dom';

const Chats = props => {
    return (
        <div className='chats'>
            
            <Outlet />
        </div>
    );
};

Chats.propTypes = {
    
};

export default Chats;