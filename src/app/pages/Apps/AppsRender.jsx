import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../containers/Layout/Layout';
import ImgLoaded from '../../components/Imgloaded/Imgloaded';
import './Apps.css'
import { Link } from 'react-router-dom';

const AppsRender = props => {
    return (
        <Layout noBtn title='Browse Apps' className='appsrender'>
            <div className="innerappsrender">
                <Link to='weather-io' className="appcard">
                    <div className="iconsection">
                    <i className="fa fa-cloud-sun"></i>
                    </div>
                    <div className="appinfo">
                        <h3>Weather IO</h3>
                    </div>
                </Link>
           
                <div className="appcard">
                    <div className="iconsection">
                        <i className="fa fa-spade"></i>
                    </div>
                    <div className="appinfo">
                        <h3>Black Jack</h3>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

AppsRender.propTypes = {
    
};

export default AppsRender;