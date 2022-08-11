import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';

const HomeRoutes = props => {
    return (
        <Routes>
            <Route index element={<LandingPage />}/>
            <Route path='/saved' element={<>a</>} />
        </Routes>
    );
};

HomeRoutes.propTypes = {
    
};

export default HomeRoutes;