import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import useGetUsersLocation from './GetUsersLocation';

const useGetWeatherInfo = props => {
    const latLng = useGetUsersLocation()
    const [weatherData, setWeatherData] = useState([])

    useEffect(()=> {
        let u = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=fdcbbefe2c5b965609c7cf6abe280721'
        axios.get(u)
        .then(data=> {
            console.log(data)
        })
        .catch(err=> {
            console.log(err)
        })
    }, [latLng])

    return 
};

useGetWeatherInfo.propTypes = {
    
};

export default useGetWeatherInfo;