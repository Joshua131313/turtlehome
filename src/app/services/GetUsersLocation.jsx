import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from '../../ContextAPI';

const useGetUsersLocation = props => {
    const {addNoti} = useContext(StoreContext)
    const [latLng, setLatLng] = useState({lat: null, lng: null})
   
    const latLngSet = (lat, lng) => {
        setLatLng({
            lat,
            lng
        })
    }

    const errorCallback  = (error) => {
        addNoti('For optimized experience share your location', 'fal fa-exclamation-circle')
        latLngSet(56.1304, 106.3468)
    }

    const successCallback = (position) => {
        latLngSet(position.coords.latitude, position.coords.longitude)
    }

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, [])

    return latLng
};

useGetUsersLocation.propTypes = {
    
};

export default useGetUsersLocation;