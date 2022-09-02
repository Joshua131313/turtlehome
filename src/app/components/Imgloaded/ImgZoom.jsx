import React from 'react';
import PropTypes from 'prop-types';
import './ImgZoom.css'
import InnerImageZoom from 'react-inner-image-zoom';

const ImgZoom = props => {
    const {setZoomed} = props
    return (
            <InnerImageZoom afterZoomIn={(e)=> {setZoomed(true)}} afterZoomOut={()=> {setZoomed(false)}} src={props.img} zoomScale={2}  />
    );
};

ImgZoom.propTypes = {
    
};

export default ImgZoom;