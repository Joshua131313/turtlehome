import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImgLoaded from '../Imgloaded/Imgloaded';
import './MediaCarousel.css'
const MediaCarousel = props => {
    const {media} = props
    const [activeImg, setActiveImg] = useState(0)
    const mediaRender = media?.map((media, i)=> {
        if(false) {
            return (
                <div className="carouselitem">
                     <ImgLoaded img={media.preview}/>
                </div>
            )
        }
        else {
            let src = media.downloadURL ?? media.preview
            return (
                <div className={`${activeImg === i ? 'activethumbnail' : ''} thumbnail`} onClick={()=> setActiveImg(i)}>
                    <ImgLoaded img={src} className={`${activeImg === i ? 'activethumbnailimg ' : ''}`}/>
                </div>
            )
        }
    })
    const RenderCarouselImg = () => {
        let activeMedia = media[activeImg]
        if (false) {

        }
        else {
            let src = activeMedia.downloadURL ?? activeMedia.preview
            return (
                <div className="carouselimg">
                    <ImgLoaded img={src} />
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
        </div>
    );
};

MediaCarousel.propTypes = {
    
};

export default MediaCarousel;