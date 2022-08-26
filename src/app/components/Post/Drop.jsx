import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM  from 'react-dom';

const Drop = props => {
    return ReactDOM.createPortal(
        <div className="drop flexcol">
                <div className="option">asd</div>
                <div className="option">asd</div>
                <div className="option">asd</div>
                <div className="option">asd</div>
            </div>
    , document.getElementById('drops'));
};

Drop.propTypes = {
    
};

export default Drop;