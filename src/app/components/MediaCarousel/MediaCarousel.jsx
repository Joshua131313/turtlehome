import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImgLoaded from '../Imgloaded/Imgloaded';
import './MediaCarousel.css'
import ImageZoom from "react-image-zooom";
import Popup from '../Popup/Popup';
const MediaCarousel = props => {
    const {media} = props
    const [activeImg, setActiveImg] = useState(0)
    const [showPopup, setShowPopup] = useState(false)

    const mediaRender = media?.map((media, i)=> {
        if(false) {
            return (
                <div className="carouselitem">
                     <ImgLoaded img={media.preview}/>
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
    const RenderCarouselImg = ({imgZoom}) => {
        let activeMedia = media[activeImg]
        if (false) {

        }
        else {
            let src = activeMedia?.downloadURL ?? activeMedia?.preview
            return (
                <div className="carouselimg" onClick={()=> setShowPopup(true)}>
                    {imgZoom ? 
                        <div className="imgloaded">
                            <ImageZoom src={src} /> 
                        </div>
                        :
                        <ImgLoaded img={src} />
                    }
                </div>
            )
        }
    }
    console.log(activeImg)
    console.log(media.length - 1 === activeImg)
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
            <RenderCarouselImg />
            <i className="appicon fal fa-chevron-right next" onClick={()=> handleNextPrev('next')}></i>
            <i className="appicon fal fa-chevron-left prev" onClick={()=> handleNextPrev()}></i>
            <div className="thumbnails">
                {mediaRender}
            </div>
            <Popup visible={showPopup} setVisible={setShowPopup} className='imagesliderpopup'>
                {/* <div className="imagecontrols">
                    <div className="controlsheader flexrow gap-10">
                        <i className="fal fa-search appicon"></i>
                        <i className="fal fa-search-minus appicon"></i>
                        <i className="fal fa-search-plus appicon"></i>
                    </div>
                </div> */}
                <div className="imgsection">
                    <RenderCarouselImg imgZoom={true}/>
                </div>
                <i className="appicon fal fa-chevron-right next" onClick={()=> handleNextPrev('next')}></i>
                <i className="appicon fal fa-chevron-left prev" onClick={()=> handleNextPrev()}></i>
                <div className="thumbnails">
                     {mediaRender}
                </div>
            </Popup>
        </div>
    );
};

MediaCarousel.propTypes = {
    
};

export default MediaCarousel;