import React from 'react';
import PropTypes from 'prop-types';
import Popup from '../Popup/Popup';
import Slider from './Slider';

const PopupSlider = props => {
    const {showPopup, setShowPopup, media, handleNextPrev, mediaRender, post, activeImg} = props
    return (
        <Popup visible={showPopup} setVisible={setShowPopup} className={`imagesliderpopup ${media?.length === 1 ? '' : 'gridview'}`}>
             <Slider allMedia={media} post={post} imgZoom={true} length={media?.length} media={typeof media ==='object' ? media : media[activeImg]} setShowPopup={setShowPopup} handleNextPrev={handleNextPrev} mediaRender={mediaRender}/>
        </Popup>
    );
};

PopupSlider.propTypes = {
    
};

export default PopupSlider;