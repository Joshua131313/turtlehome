import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImgLoaded from '../Imgloaded/Imgloaded';
import ImgZoom from '../Imgloaded/ImgZoom';

const RenderPostMedia = (props) => {
    const {media, imgZoom, setShowPopup, scale, setZoomed, zoomScale, onClick} = props
    const [med, setMed] = useState(media)
    const [rowColumnSpan, setRowColumnSpan] = useState({row: 0, column: 0})
   
    useEffect(()=> {
        setRowColumnSpan({row: 0, column: 0})
    }, [media])
    if (media?.fileType?.includes('video')) {
        let src =  media?.media ?? media?.downloadURL
        return (
            <div className="carouselimg carouselvid">
                <video src={src} controls={1}></video>
            </div>
        )
    }
    else {
        let src = media?.media ?? media?.downloadURL ?? media?.preview
        return (
            <div className="carouselimg" onClick={()=> {onClick?.(media); console.log(media); setShowPopup?.(true)}}>
                {imgZoom ? 
                    <ImgZoom img={src} scale={scale} setZoomed={setZoomed}/>
                    :
                    <ImgLoaded  img={src} zoomScale={zoomScale}/>
                }
            </div>
        )
    } 
}
RenderPostMedia.propTypes = {
    
}; 

export default RenderPostMedia;