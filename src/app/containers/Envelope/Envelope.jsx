import React from 'react';
import PropTypes from 'prop-types';
import './Envelope.css'

const Envelope = props => {
    return (
        <div className={`envelope ${props.className}`}>
            {props.children}
        </div>
    );
};

Envelope.propTypes = {
    
};

export default Envelope;