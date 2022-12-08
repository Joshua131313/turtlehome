import React from 'react';
import PropTypes from 'prop-types';
import { handleLogout } from '../../services/DBFunctions';
import { Link, useNavigate } from 'react-router-dom';

const LogoutWrapper = props => {
    const navigate = useNavigate()

    return (
        <Link to='/' onClick={()=> handleLogout()}>
            {props.children}
        </Link>
    );
};

LogoutWrapper.propTypes = {
    
};

export default LogoutWrapper;