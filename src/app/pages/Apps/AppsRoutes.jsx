import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import Apps from './Apps';
import AppsRender from './AppsRender';
import Weather from './Weather';
import BlackJack from './BlackJack';

const AppsRoutes = props => {
    return (
        <Routes>
             <Route element={<Apps />}>
                <Route index element={<AppsRender />} />
                <Route path='weather-io' element={<Weather />}/>
                <Route path='blackjack' element={<BlackJack />}/>
             </Route>
        </Routes>
    );
};

AppsRoutes.propTypes = {
    
};

export default AppsRoutes;