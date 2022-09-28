import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../containers/Layout/Layout';
import { Outlet } from 'react-router-dom';

const Apps = props => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

Apps.propTypes = {
    
};

export default Apps;