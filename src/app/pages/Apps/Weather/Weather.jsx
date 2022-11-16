import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Layout from '../../../containers/Layout/Layout';
import useGetWeatherInfo from '../../../services/GetWeatherInfo';

const Weather = props => {
    const weatherData = useGetWeatherInfo()
    
    return (
        <Layout className='weatherapp' title='WeatherIO' noBtn backBtn>
            
        </Layout>
    );
};

Weather.propTypes = {
    
};

export default Weather;