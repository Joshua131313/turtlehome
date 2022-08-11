import React from 'react';
import PropTypes from 'prop-types';
import './LandingPage.css'
import Layout from '../../containers/Layout/Layout';


const LandingPage = props => {
    const container = {
        className: 'landingpage',
    }
    return (
        <Layout {...container}>
        </Layout>
    );
};

LandingPage.propTypes = {
    
};

export default LandingPage;