import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const Portal = props => {
    const {id='drops'} = props
    return createPortal(
        <div className={props.className}>
            {props.children}
        </div>
    ,  document.getElementById('drops'));
};

Portal.propTypes = {
    
};

export default Portal;