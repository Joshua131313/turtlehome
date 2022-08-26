import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Popup.css'
import Portal from '../Portal/Portal';

const Popup = props => {
    const [showPopup, setShowPopup] = useState(false) 
    const {className, visible, setVisible} = props
    return (
       <>
       <Portal className={` popup ${visible ? 'activepopup' : ''}`}>
           <i className="closeicon fal fa-times" onClick={()=> setVisible(false)}></i>
           <div className={`${props.className} popupcontent`}>
               {props.children}
           </div>
       </Portal>
       </>
    );
};

Popup.propTypes = {
    className: '',
    visible: '',
    setVisible: ''
};

export default Popup;