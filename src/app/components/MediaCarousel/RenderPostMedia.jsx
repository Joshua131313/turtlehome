import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImgLoaded from '../Imgloaded/Imgloaded';
import ImgZoom from '../Imgloaded/ImgZoom';

const RenderPostMedia = (props) => {
    const {media, imgZoom, setShowPopup, scale} = props
    const [med, setMed] = useState(media)

    
    if (false) {

    }
    else {
        let src = media?.downloadURL ?? media?.preview
        return (
            <div className="carouselimg" onClick={()=> setShowPopup?.(true)}>
                {imgZoom ? 
                    <ImgZoom img={src} scale={scale}/>
                    :
                    <ImgLoaded img={src} />
                }
            </div>
        )
    } 
}
RenderPostMedia.propTypes = {
    
}; 

export default RenderPostMedia;