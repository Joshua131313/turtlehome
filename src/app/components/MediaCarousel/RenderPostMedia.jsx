import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImgLoaded from '../Imgloaded/Imgloaded';
import ImgZoom from '../Imgloaded/ImgZoom';

const RenderPostMedia = (props) => {
    const {media, imgZoom, setShowPopup, scale, setZoomed} = props
    const [med, setMed] = useState(media)

    
    if (media?.fileType?.includes('video')) {
        let src = media?.downloadURL
        return (
            <div className="carouselimg carouselvid">
                <video src={src} controls={1}></video>
            </div>
        )
    }
    else {
        let src = media?.downloadURL ?? media?.preview
        return (
            <div className="carouselimg" onClick={()=> setShowPopup?.(true)}>
                {imgZoom ? 
                    <ImgZoom img={src} scale={scale} setZoomed={setZoomed}/>
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