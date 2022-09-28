import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Popup.css'
import Portal from '../Portal/Portal';

const Popup = props => {
    const {className, visible, setVisible, popupClassName, El} = props
    if(!visible) return null
    return (
       <>
       <Portal setVisible={setVisible} showPortal={visible} className={`${popupClassName} popup ${visible ? 'activepopup' : ''}`}>
           <i className="closeicon fal fa-times" onClick={()=> setVisible(false)}></i>
           <div className={`${className} popupcontent`} onClick={e=> e.stopPropagation()}>
               {props.children}
           </div>
           {props.El}
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