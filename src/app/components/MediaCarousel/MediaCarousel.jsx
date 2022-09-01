import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImgLoaded from '../Imgloaded/Imgloaded';
import './MediaCarousel.css'
import Popup from '../Popup/Popup';
import RenderPostMedia from './RenderPostMedia';
import Slider from './Slider';

const MediaCarousel = props => {
    const {media} = props
    const [activeImg, setActiveImg] = useState(0)
    const [showPopup, setShowPopup] = useState(false)
    const mediaRender = media?.map((media, i)=> {
        if(media.fileType?.includes('video')) {
            return (
                <div className={`${activeImg === i ? 'activethumbnail' : ''} thumbnail`} onClick={()=> setActiveImg(i)}>
                    <video src={media.downloadURL} controls={false}  frameborder="0"></video>
                </div>
            )
        }
        else {
            let src = media?.downloadURL ?? media?.preview
            return (
                <div className={`${activeImg === i ? 'activethumbnail' : ''} thumbnail`} onClick={()=> setActiveImg(i)}>
                    <ImgLoaded img={src} className={`${activeImg === i ? 'activethumbnailimg ' : ''}`}/>
                </div>
            )
        }
    })
 
   
    const handleNextPrev = (direction) => {
        //next
        if(direction === 'next') {
            if(activeImg === media?.length - 1) {
                setActiveImg(0)
            }
            else {
                setActiveImg(prev=> prev + 1)
            }
         
        }
        //previous
       else {
            if(activeImg === 0) {
                setActiveImg(media?.length - 1)
            }
            else {
                setActiveImg(prev=> prev - 1)
            }
       }
        
    }

    return (
        <div className='mediacarousel flexwrap flexrow'>
            <Slider length={media?.length} spec media={media[activeImg]} setShowPopup={setShowPopup} handleNextPrev={handleNextPrev} mediaRender={mediaRender}/>
            <Popup visible={showPopup} setVisible={setShowPopup} className={`imagesliderpopup ${media?.length === 1 ? '' : 'gridview'}`}>
                <Slider imgZoom={true} length={media?.length} media={media[activeImg]} setShowPopup={setShowPopup} handleNextPrev={handleNextPrev} mediaRender={mediaRender}/>
            </Popup>
        </div>
    );
};

MediaCarousel.propTypes = {
    
};

export default MediaCarousel;