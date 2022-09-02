import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RenderPostMedia from './RenderPostMedia';

const Slider = props => {
    const [zoomed, setZoomed] = useState(false)
    const {media, setShowPopup, handleNextPrev, mediaRender, imgZoom, length} = props
    return (
        <>
        <div className="imgsection" >
             <RenderPostMedia setZoomed={setZoomed} media={media} imgZoom={imgZoom} setShowPopup={setShowPopup}/>
       </div>
            {
            (length !== 1 && !zoomed) ?<>
            <i className="appicon fal fa-chevron-right next" onClick={()=> handleNextPrev('next')}></i>
            <i className="appicon fal fa-chevron-left prev" onClick={()=> handleNextPrev()}></i>
            </>
            :''
            }
       {length !== 1 ? 
       <div className="thumbnails">
            {mediaRender}
        </div> : ''}
        </>
    );
};

Slider.propTypes = {
    
};

export default Slider;