import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Portal = props => {
    const {id='drops', style, showPortal, setVisible} = props
    
    if (!showPortal) return null

    return ReactDOM.createPortal(
        <div className={props.className} style={style? style : {}} onClick={()=> setVisible(false)}>
            {props.children}
        </div>
    ,  document.body)
};

Portal.propTypes = {
    
};

export default Portal;