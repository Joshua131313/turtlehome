import React from 'react';
import PropTypes from 'prop-types';
import './Layout.css'

const Layout = props => {
    return (
        <div  {...props} className={`layout ${props.className}`}>
            {props.children}
        </div> 
    );
};

Layout.propTypes = {
    
};

export default Layout;