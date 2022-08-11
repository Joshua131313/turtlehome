import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../../components/Navbar/Navbar';
import HomeRoutes from './HomeRoutes';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import './Home.css'

const Home = props => {
    return (
        <div className='home'>
            <Navbar />
            <div className="appcontent">
              <Outlet />
            </div>
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;