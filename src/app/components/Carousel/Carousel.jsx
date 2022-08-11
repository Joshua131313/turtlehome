import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'better-react-carousel'
import ImgLoaded from '../Imgloaded/Imgloaded';
import './Carousel.css'
import AppBtn from '../AppBtn/AppBtn';
import { Link } from 'react-router-dom';

const AppCarousel = props => {
    const {items} = props
    const carouselRow = items.map(item=> {
        return (
            <Carousel.Item>
                <div className="slide">
                    <div className="slidetext flexcol">
                        <h1>{item.text}</h1>
                        <span>{item.subText}</span>
                        <Link to={item.link}>
                           <AppBtn text='Learn more'/>
                        </Link>
                    </div>
                    <ImgLoaded img={item.img} />
                </div>
            </Carousel.Item>
        )
    })
    return (
        <Carousel>
            {carouselRow}
        </Carousel>
    );
};

AppCarousel.propTypes = {
    
};

export default AppCarousel;